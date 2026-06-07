import { ImageResponse } from "next/og";
import { restaurant } from "@/data/restaurant";

export const alt = `${restaurant.name} — Trattoria włoska w ${restaurant.address.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#211712",
          color: "#fbf7f0",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* ramka */}
        <div
          style={{
            position: "absolute",
            inset: 32,
            border: "2px solid rgba(201,154,75,0.55)",
            borderRadius: 16,
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#c99a4b",
            display: "flex",
          }}
        >
          Trattoria · {restaurant.address.city}
        </div>
        <div
          style={{
            fontSize: 130,
            fontWeight: 600,
            marginTop: 8,
            display: "flex",
          }}
        >
          Bella{" "}
          <span style={{ color: "#c99a4b", fontStyle: "italic", marginLeft: 24 }}>
            Cucina
          </span>
        </div>
        <div
          style={{
            fontSize: 34,
            color: "rgba(251,247,240,0.85)",
            marginTop: 16,
            display: "flex",
          }}
        >
          {restaurant.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
