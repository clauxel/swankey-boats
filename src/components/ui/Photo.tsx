import Image from "next/image";
import type { PhotoAsset } from "@/lib/media";

export function Photo({
  photo,
  className = "",
  imgClassName = "object-cover",
  priority = false,
  sizes = "100vw",
}: {
  photo: PhotoAsset;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-graphite ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={imgClassName}
      />
    </div>
  );
}

export function PhotoFrame({
  photo,
  className = "",
  imgClassName = "object-cover",
  priority = false,
  sizes = "100vw",
  caption,
}: {
  photo: PhotoAsset;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
}) {
  return (
    <figure className={className}>
      <Photo
        photo={photo}
        className="aspect-[16/10] w-full"
        imgClassName={imgClassName}
        priority={priority}
        sizes={sizes}
      />
      {caption ? <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
