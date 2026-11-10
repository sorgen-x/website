import hero750 from "@/assets/img/product-hero-750.webp";
import hero1480 from "@/assets/img/product-hero-1480.webp";
import door800 from "@/assets/img/product-door-800.webp";
import door1400 from "@/assets/img/product-door-1400.webp";
import door2000 from "@/assets/img/product-door-2000.webp";
import interior640 from "@/assets/img/product-interior-640.webp";
import interior1262 from "@/assets/img/product-interior-1262.webp";
import topdown640 from "@/assets/img/product-topdown-640.webp";
import topdown1262 from "@/assets/img/product-topdown-1262.webp";

export type SiteImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

function image(variants: Array<[string, number]>, height: number): SiteImage {
  const [largestSrc, largestWidth] = variants[variants.length - 1];
  return {
    src: largestSrc,
    srcSet: variants.map(([src, w]) => `${src} ${w}w`).join(", "),
    width: largestWidth,
    height,
  };
}

export const siteImages = {
  hero: image([[hero750, 750], [hero1480, 1480]], 1600),
  door: image([[door800, 800], [door1400, 1400], [door2000, 2000]], 1193),
  interior: image([[interior640, 640], [interior1262, 1262]], 723),
  topdown: image([[topdown640, 640], [topdown1262, 1262]], 832),
} satisfies Record<string, SiteImage>;
