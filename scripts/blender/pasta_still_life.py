"""
Bella Cucina: proceduralna martwa natura z makaronu (rigatoni, farfalle, orecchiette).

Wszystko powstaje w tym skrypcie: geometria (bmesh), ułożenie (symulacja brył
sztywnych, makaron spada na blat i sam się układa), materiały i światło.
Bez zewnętrznych modeli i tekstur. Tło przezroczyste, cień kontaktowy z
shadow catchera, wynik: PNG z alfą (konwersja do WebP osobno).

Uruchomienie (z katalogu repo):
  blender --background --factory-startup --python-exit-code 1 \
    --python scripts/blender/pasta_still_life.py -- --out .claude/render/pasta.png --scale 0.5

Argumenty po "--":
  --out     ścieżka PNG (domyślnie .claude/render/pasta.png)
  --scale   mnożnik rozdzielczości 1600x1200 (0.5 = szybki podgląd)
  --samples liczba próbek Cycles (domyślnie 96)
"""

import math
import random
import sys
from pathlib import Path

import bmesh
import bpy
from mathutils import Vector

# ---------------------------------------------------------------- argumenty
argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []


def arg(name, default):
    if name in argv:
        return argv[argv.index(name) + 1]
    return default


OUT = Path(arg("--out", ".claude/render/pasta.png")).resolve()
SCALE = float(arg("--scale", "1"))
SAMPLES = int(arg("--samples", "96"))
SEED = 1987  # rok założenia trattorii: ten sam układ przy każdym renderze
rng = random.Random(SEED)

# ---------------------------------------------------------------- scena
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.device = "GPU"
prefs = bpy.context.preferences.addons["cycles"].preferences
try:
    prefs.compute_device_type = "METAL"
    prefs.get_devices()
    for d in prefs.devices:
        d.use = True
except Exception:  # brak Metal: zostaje CPU
    scene.cycles.device = "CPU"

scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.render.film_transparent = True
scene.render.resolution_x = int(1600 * SCALE)
scene.render.resolution_y = int(1200 * SCALE)
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.image_settings.color_depth = "16"
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Medium High Contrast"
scene.view_settings.exposure = -0.2

# ---------------------------------------------------------------- materiały
def srgb(hex_str):
    """#rrggbb -> liniowe RGBA (Principled BSDF pracuje w liniowym)."""
    h = hex_str.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(h[i : i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return (*out, 1.0)


def pasta_material(name, base_hex, sss_hex):
    """Suchy makaron: lekko przeświecający, matowy, z drobną chropowatością
    (makaron z brązowej matrycy ma szorstką powierzchnię, na której trzyma się sos)."""
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = srgb(base_hex)
    bsdf.inputs["Roughness"].default_value = 0.62
    bsdf.inputs["Subsurface Weight"].default_value = 0.35
    bsdf.inputs["Subsurface Radius"].default_value = (0.9, 0.55, 0.25)
    bsdf.inputs["Subsurface Scale"].default_value = 0.04
    bsdf.inputs["Coat Weight"].default_value = 0.0

    # drobna faktura: szum -> bump
    tex = nt.nodes.new("ShaderNodeTexNoise")
    tex.inputs["Scale"].default_value = 180.0
    tex.inputs["Detail"].default_value = 8.0
    tex.inputs["Roughness"].default_value = 0.6
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.18
    bump.inputs["Distance"].default_value = 0.004
    nt.links.new(tex.outputs["Fac"], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    # delikatne przebarwienia (miejsca grubsze/cieńsze ciasta)
    tex2 = nt.nodes.new("ShaderNodeTexNoise")
    tex2.inputs["Scale"].default_value = 9.0
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = srgb(base_hex)
    ramp.color_ramp.elements[1].color = srgb(sss_hex)
    ramp.color_ramp.elements[0].position = 0.42
    ramp.color_ramp.elements[1].position = 0.68
    nt.links.new(tex2.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    sss_col = srgb(sss_hex)
    bsdf.inputs["Subsurface Radius"].default_value = (
        max(sss_col[0], 0.2),
        max(sss_col[1], 0.12),
        max(sss_col[2], 0.06),
    )
    return mat


# paleta strony: semolina (złoto), pomidor (terakota), szpinak (oliwka)
MAT_SEMOLINA = pasta_material("semolina", "#dcb260", "#c99a48")
MAT_POMODORO = pasta_material("pomodoro", "#b9482a", "#a23c20")
MAT_SPINACI = pasta_material("spinaci", "#76833f", "#66733a")


def pick_material():
    r = rng.random()
    if r < 0.66:
        return MAT_SEMOLINA
    if r < 0.84:
        return MAT_POMODORO
    return MAT_SPINACI


# ---------------------------------------------------------------- geometria
def finish(bm, name, thickness):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    obj = bpy.data.objects.new(name, me)
    scene.collection.objects.link(obj)
    for p in me.polygons:
        p.use_smooth = True
    sol = obj.modifiers.new("grubosc", "SOLIDIFY")
    sol.thickness = thickness
    sol.offset = -1
    sol.use_even_offset = False
    sub = obj.modifiers.new("gladkosc", "SUBSURF")
    sub.levels = 1
    sub.render_levels = 2
    return obj


def make_rigatoni(name, length=1.0, radius=0.175, ridges=22, bend=0.12):
    """Rurka z podłużnymi rowkami, lekko wygięta, końce cięte prosto z drobną nierównością."""
    bm = bmesh.new()
    around = ridges * 6
    rings = 28
    grid = []
    for j in range(rings + 1):
        t = j / rings
        z = (t - 0.5) * length
        row = []
        for i in range(around):
            a = 2 * math.pi * i / around
            ridge = 0.5 + 0.5 * math.cos(ridges * a)
            r = radius * (1 + 0.075 * ridge ** 1.6)
            x, y = r * math.cos(a), r * math.sin(a)
            # łagodne wygięcie wzdłuż osi
            x += bend * (1 - (2 * t - 1) ** 2) * length * 0.5
            # nierówne cięcie końców
            zz = z
            if j in (0, rings):
                zz += 0.012 * math.sin(3 * a + j)
            row.append(bm.verts.new((x, y, zz)))
        grid.append(row)
    for j in range(rings):
        for i in range(around):
            a, b = grid[j][i], grid[j][(i + 1) % around]
            c, d = grid[j + 1][(i + 1) % around], grid[j + 1][i]
            bm.faces.new((a, b, c, d))
    return finish(bm, name, 0.035)


def make_farfalle(name, w=0.95, h=0.7):
    """Prostokąt ciasta ściśnięty w środku, z ząbkowanymi (radełkowanymi) krótszymi bokami."""
    bm = bmesh.new()
    nu, nv = 36, 22
    grid = []
    for j in range(nv + 1):
        v = j / nv * 2 - 1
        row = []
        for i in range(nu + 1):
            u = i / nu * 2 - 1
            pinch = 0.32 + 0.68 * abs(u) ** 0.85
            x = u * w / 2
            y = v * h / 2 * pinch
            # fałda w środku i falowanie skrzydełek
            z = 0.09 * math.exp(-(u * 4.2) ** 2) * math.cos(v * math.pi * 1.5)
            z += 0.05 * math.sin(v * math.pi) * abs(u)
            # radełko na krótszych bokach
            if i in (0, nu):
                x += (0.018 if j % 2 else -0.018) * (1 if u > 0 else -1)
            row.append(bm.verts.new((x, y, z)))
        grid.append(row)
    for j in range(nv):
        for i in range(nu):
            bm.faces.new((grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]))
    return finish(bm, name, 0.04)


def make_orecchiette(name, radius=0.26):
    """„Uszko”: wklęsła miseczka z grubszym, nierównym rantem."""
    bm = bmesh.new()
    nr, na = 14, 48
    center = bm.verts.new((0, 0, -0.07))
    rings = []
    for j in range(1, nr + 1):
        rr = j / nr
        row = []
        for i in range(na):
            a = 2 * math.pi * i / na
            wob = 1 + 0.05 * math.sin(3 * a + 1.3) + 0.03 * math.sin(7 * a)
            r = radius * rr * wob
            z = -0.07 * (1 - rr ** 2) + 0.02 * rr ** 6
            row.append(bm.verts.new((r * math.cos(a), r * math.sin(a), z)))
        rings.append(row)
    for i in range(na):
        bm.faces.new((center, rings[0][i], rings[0][(i + 1) % na]))
    for j in range(nr - 1):
        for i in range(na):
            bm.faces.new(
                (rings[j][i], rings[j][(i + 1) % na], rings[j + 1][(i + 1) % na], rings[j + 1][i])
            )
    return finish(bm, name, 0.045)


# ---------------------------------------------------------------- blat i fizyka
bpy.ops.mesh.primitive_plane_add(size=12, location=(0, 0, 0))
ground = bpy.context.active_object
ground.name = "blat"
ground.is_shadow_catcher = True
bpy.ops.rigidbody.world_add()
scene.rigidbody_world.substeps_per_frame = 30
scene.rigidbody_world.solver_iterations = 30
# grubą bryłę kolizji stawiamy pod cienkim blatem (płaszczyzna bez grubości przepuszcza szybkie kawałki)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, -0.5))
floor = bpy.context.active_object
floor.name = "podloze"
floor.scale = (12, 12, 1)
bpy.ops.rigidbody.object_add(type="PASSIVE")
floor.rigid_body.collision_shape = "BOX"
floor.rigid_body.friction = 0.9
floor.hide_render = True

# niewidoczny pierścień: makaron nie odturla się poza kadr (znika przed renderem)
bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.95, depth=1.6, location=(0, 0, 0.8), end_fill_type="NOTHING")
fence = bpy.context.active_object
fence.name = "pierscien"
bpy.ops.rigidbody.object_add(type="PASSIVE")
fence.rigid_body.collision_shape = "MESH"
fence.rigid_body.friction = 0.6
fence.hide_render = True

pieces = []
spec = (
    [("rigatoni", make_rigatoni)] * 8
    + [("farfalle", make_farfalle)] * 3
    + [("orecchiette", make_orecchiette)] * 5
)
rng.shuffle(spec)
for k, (kind, maker) in enumerate(spec):
    if kind == "rigatoni":
        obj = maker(f"{kind}_{k}", length=rng.uniform(0.9, 1.08), bend=rng.uniform(0.05, 0.16))
    else:
        obj = maker(f"{kind}_{k}")
    obj.data.materials.append(pick_material())
    # start bez nachodzenia: po 3 kawałki na warstwę, warstwy co 0.6;
    # spadając układają się w luźny kopczyk
    layer, slot = divmod(k, 3)
    ang = 2 * math.pi * slot / 3 + layer * 0.9 + rng.uniform(-0.2, 0.2)
    obj.location = (math.cos(ang) * 0.55, math.sin(ang) * 0.55, 0.6 + layer * 0.6)
    obj.rotation_euler = (rng.uniform(0, math.pi), rng.uniform(0, math.pi), rng.uniform(0, math.pi))
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.rigidbody.object_add(type="ACTIVE")
    obj.rigid_body.collision_shape = "CONVEX_HULL"
    obj.rigid_body.mass = 0.05
    obj.rigid_body.friction = 0.8
    obj.rigid_body.restitution = 0.05
    obj.rigid_body.linear_damping = 0.4
    obj.rigid_body.angular_damping = 0.85
    obj.select_set(False)
    pieces.append(obj)

SETTLE = 220
scene.frame_start = 1
scene.frame_end = SETTLE
scene.rigidbody_world.point_cache.frame_end = SETTLE
for f in range(1, SETTLE + 1):
    scene.frame_set(f)
print(f"[pasta] symulacja: {SETTLE} klatek")

depsgraph = bpy.context.evaluated_depsgraph_get()
# kawałek, który przebił blat albo pierścień (tunelowanie przy dużej prędkości),
# leży daleko od kopczyka i niczego nie podpiera: chowamy go
kept = []
for p in pieces:
    l = p.matrix_world.translation
    if l.z < -0.05 or Vector((l.x, l.y)).length > 1.1:
        p.hide_render = True
    else:
        kept.append(p)
print(f"[pasta] w kadrze {len(kept)} z {len(pieces)} kawałków")

# prostopadłościan otaczający kopczyk -> cel i odległość kamery
pts = []
for p in kept:
    ev = p.evaluated_get(depsgraph)
    for v in ev.data.vertices:
        pts.append(p.matrix_world @ v.co)
lo = Vector((min(v.x for v in pts), min(v.y for v in pts), min(v.z for v in pts)))
hi = Vector((max(v.x for v in pts), max(v.y for v in pts), max(v.z for v in pts)))
center = (lo + hi) / 2
span = max(hi.x - lo.x, hi.y - lo.y, (hi.z - lo.z) * 1.6)
print(f"[pasta] rozpiętość kopczyka {span:.2f}")

# ---------------------------------------------------------------- światło
def area_light(name, loc, energy, size, kelvin_rgb):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.size = size
    data.color = kelvin_rgb
    obj = bpy.data.objects.new(name, data)
    scene.collection.objects.link(obj)
    obj.location = loc
    direction = center - Vector(loc)
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    return obj


# ciepłe światło z lewej (jak okno + żarówka), chłodniejsze wypełnienie, kontra z tyłu
area_light("klucz", (-3.2, -2.2, 3.4), 380, 2.4, (1.0, 0.78, 0.55))
area_light("wypelnienie", (3.4, -2.8, 1.6), 90, 3.5, (0.95, 0.9, 0.85))
area_light("kontra", (0.8, 3.4, 2.6), 260, 1.6, (1.0, 0.72, 0.45))

world = bpy.data.worlds.new("swiat")
scene.world = world
world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = srgb("#3a2a20")
world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.35

# ---------------------------------------------------------------- kamera
cam_data = bpy.data.cameras.new("kamera")
cam_data.lens = 85
cam_data.dof.use_dof = True
cam_data.dof.aperture_fstop = 5.6
cam = bpy.data.objects.new("kamera", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam
# odległość tak, by kopczyk zajął ok. 75% szerokości kadru (85 mm, matryca 36 mm)
fov = 2 * math.atan(36 / (2 * cam_data.lens))
dist = (span / 0.75) / (2 * math.tan(fov / 2))
view_dir = Vector((0.12, -0.8, 0.62)).normalized()
cam.location = center + view_dir * dist
cam.rotation_euler = (center - cam.location).to_track_quat("-Z", "Y").to_euler()
cam_data.dof.focus_distance = (center - cam.location).length

# ---------------------------------------------------------------- render
OUT.parent.mkdir(parents=True, exist_ok=True)
scene.render.filepath = str(OUT)
bpy.ops.render.render(write_still=True)
print(f"[pasta] zapisano {OUT}")
