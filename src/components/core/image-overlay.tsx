import * as React from "react";

import { cn } from "@/lib/utils";

interface ImageOverlayProps extends React.ComponentProps<"div"> {
  src?: string;
  alt?: string;
  overlayOpacity?: number;
  overlayClassName?: string;
}

function ImageOverlay({
  src,
  alt,
  overlayOpacity = 0.4,
  overlayClassName,
  className,
  children,
  ...props
}: ImageOverlayProps) {
  return (
    <div
      data-slot="image-overlay"
      className={cn("relative isolate overflow-hidden", className)}
      {...props}
    >
      {src ? (
        <img
          data-slot="image-overlay-img"
          src={src}
          alt={alt ?? ""}
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      <div
        data-slot="image-overlay-overlay"
        className={cn("absolute inset-0 bg-black", overlayClassName)}
        style={{ opacity: overlayOpacity }}
      />
      <div data-slot="image-overlay-content" className="relative">
        {children}
      </div>
    </div>
  );
}

export { ImageOverlay };
