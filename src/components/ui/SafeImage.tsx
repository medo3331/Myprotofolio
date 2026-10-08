"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  fallbackColor?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function SafeImage({
  src,
  alt,
  className,
  fallbackText,
  fallbackColor = "00ff9d",
  fill,
  width,
  height,
  priority,
}: Props) {
  const [err, setErr] = useState(false);
  const fallback = `https://placehold.co/800x450/141414/${fallbackColor}?text=${encodeURIComponent(
    fallbackText || alt
  )}`;
  const finalSrc = err || !src ? fallback : src;

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={className}
        onError={() => setErr(true)}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width ?? 800}
      height={height ?? 450}
      className={className}
      onError={() => setErr(true)}
      priority={priority}
    />
  );
}

