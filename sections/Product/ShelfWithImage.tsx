import { Section } from "deco/blocks/section.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface Props {
  /**
   * @format color
   */
  bgColor: string;
  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt?: string;
    href?: string;
  };
  title?: string;
  markupTitle?: boolean;
  description?: string;
  headerAlignment?: "center" | "left";
  headerfontSize?: "Normal" | "Large" | "Small";
  section: Section;
}

export default function ShelfWithImage(
  {
    bgColor,
    section,
    image,
    title,
    markupTitle,
    description,
    headerAlignment,
    headerfontSize,
  }: Props,
) {
  return (
    <div
      class="w-full flex flex-col py-16 gap-10"
      style={{ backgroundColor: bgColor }}
    >
      <div class={`hidden w-full lg:flex lg:justify-center`}>
        <Header
          title={title || ""}
          description={description || ""}
          markupTitle={markupTitle}
          fontSize={headerfontSize || "Large"}
          alignment={headerAlignment || "center"}
        />
      </div>
      <div class="flex flex-col lg:flex-row w-11/12 mx-auto max-w-[1300px] lg:justify-between lg:gap-8">
        <a
          href={image.href}
          class={`w-full flex md:justify-center lg:w-[33.7vw] lg:max-w-[484px]`}
        >
          <Picture preload={false}>
            <Source
              media="(max-width: 767px)"
              fetchPriority={"low"}
              src={image.mobile}
              width={344}
              height={300}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={"low"}
              src={image.desktop}
              width={484}
              height={558}
            />
            <img
              class="object-cover w-full rounded-3xl h-[calc(92vw*(300/344))] mb-8 md:h-[calc(33.7vw*(558/484))] lg:mb-0 lg:max-h-[558px]"
              loading={"lazy"}
              src={image.desktop}
              alt={image.alt}
            />
          </Picture>
        </a>
        <div class={`flex w-full mb-8 lg:hidden`}>
          <Header
            title={title || ""}
            description={description || ""}
            markupTitle={markupTitle}
            fontSize={headerfontSize || "Large"}
            alignment={headerAlignment || "center"}
          />
        </div>
        <div class="w-full containerSection mx-auto flex items-center lg:items-end lg:w-[54vw] lg:max-w-[778px]">
          <section.Component {...section.props} />
        </div>
      </div>
    </div>
  );
}
