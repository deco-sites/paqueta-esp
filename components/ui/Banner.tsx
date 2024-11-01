import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  bgGray?: boolean;
  borderRadius: BorderRadius;
}

const RADIUS = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

export default function BannnerGrid(
  { srcMobile, srcDesktop, alt, href, borderRadius, bgGray }: Props,
) {
  return (
    <div
      class={`flex w-full py-8 ${
        bgGray ? "bg-base-300" : "bg-base-100"
      } lg:py-16`}
    >
      <a href={href} class={`w-11/12 mx-auto max-w-[1300px]`}>
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={srcMobile}
            width={344}
            height={300}
          />
          <Source
            media="(min-width: 768px)"
            src={srcDesktop ? srcDesktop : srcMobile}
            width={1300}
            height={450}
          />
          <img
            class={`${
              RADIUS[borderRadius ?? "none"]
            } w-full h-[calc(92vw*(300/344))] md:h-[calc(92vw*(450/1300))] md:max-h-[450px]`}
            src={srcMobile}
            alt={alt}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </a>
    </div>
  );
}
