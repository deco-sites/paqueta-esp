import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import TitleContent from "./TitleContent.tsx";
import ContainerContent from "$store/components/institucionals/ContainerContent.tsx";

interface DeviceImage {
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
  alt?: string;
}

interface Images {
  imageRow: DeviceImage;
  imageCol1: DeviceImage;
  imageCol2: DeviceImage;
}

export interface Props {
  title: string;
  gridImages: Images;
  text: HTMLWidget;
}

export default function BannerGridText({ title, gridImages, text }: Props) {
  return (
    <ContainerContent>
      <TitleContent title={title} />
      <div class={`flex flex-col items-center justify-center gap-4 md:gap-8`}>
        <Picture
          class={`w-full h-[calc(83vw*(200/311))] md:h-[calc(60.7vw*(434/873))] md:max-h-[434px]`}
        >
          <Source
            media="(max-width: 767px)"
            src={gridImages.imageRow.imageMobile}
            width={311}
            height={200}
          />
          <Source
            media="(min-width: 768px)"
            src={gridImages.imageRow.imageDesktop}
            width={873}
            height={434}
          />
          <img
            class={`object-cover w-full h-full rounded-lg`}
            src={gridImages.imageRow.imageMobile}
            alt={gridImages.imageRow.alt || ""}
            decoding="auto"
            loading="eager"
          />
        </Picture>
        <div class={`w-full flex gap-4 md:gap-8 items-center justify-center`}>
          <Picture
            class={`w-full h-[calc(39.2vw*(143/147))] md:h-[calc(29.2vw*(326/420))] md:max-h-[326px]`}
          >
            <Source
              media="(max-width: 767px)"
              src={gridImages.imageCol1.imageMobile}
              width={147}
              height={143}
            />
            <Source
              media="(min-width: 768px)"
              src={gridImages.imageCol1.imageDesktop}
              width={420}
              height={326}
            />
            <img
              class={`object-cover w-full h-full rounded-lg`}
              src={gridImages.imageCol1.imageMobile}
              alt={gridImages.imageCol1.alt || ""}
              decoding="auto"
              loading="eager"
            />
          </Picture>
          <Picture
            class={`w-full h-[calc(39.2vw*(143/147))] md:h-[calc(29.2vw*(326/420))] md:max-h-[326px]`}
          >
            <Source
              media="(max-width: 767px)"
              src={gridImages.imageCol2.imageMobile}
              width={147}
              height={143}
            />
            <Source
              media="(min-width: 768px)"
              src={gridImages.imageCol2.imageDesktop}
              width={420}
              height={326}
            />
            <img
              class={`object-cover w-full h-full rounded-lg`}
              src={gridImages.imageCol2.imageMobile}
              alt={gridImages.imageCol2.alt || ""}
              decoding="auto"
              loading="eager"
            />
          </Picture>
        </div>
      </div>
      <div
        class={`text-base md:text-lg flex flex-col gap-4 leading-[22.5px] font-medium text-black text-opacity-60`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </ContainerContent>
  );
}
