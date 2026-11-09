import type { ImgHTMLAttributes } from "react";
import type { SiteImage } from "@/lib/images";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  image: SiteImage;
  alt: string;
  sizes: string;
  priority?: boolean;
};

export function ResponsiveImage({ image, alt, sizes, priority = false, ...rest }: Props) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      {...rest}
    />
  );
}
