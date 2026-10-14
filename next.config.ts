import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 = domyślna; 85 dla zdjęcia w hero (ciemne partie świec i sklepienia
    // przy 75 dostają pasy i plamy kompresji)
    qualities: [75, 85],
  },
};

export default nextConfig;
