import { Music2, type LucideIcon } from "lucide-react";

const defaultPalettes = [
  "from-[#6C63FF] via-[#8B63FF] to-[#EC4899]",
  "from-[#A855F7] via-[#C063E8] to-[#EC4899]",
  "from-[#6C63FF] via-[#7C6CF0] to-[#A855F7]",
  "from-[#EC4899] via-[#D6579E] to-[#6C63FF]",
];

export function AlbumArt({
  seed = 0,
  className = "",
  rounded = "rounded-2xl",
  palette,
  icon: Icon = Music2,
}: {
  seed?: number;
  className?: string;
  rounded?: string;
  palette?: string[];
  icon?: LucideIcon;
}) {
  const palettes = palette && palette.length > 0 ? palette : defaultPalettes;
  const gradient = palettes[seed % palettes.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${rounded} ${className}`}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
      <Icon className="relative text-white/90" strokeWidth={1.5} size="38%" />
    </div>
  );
}
