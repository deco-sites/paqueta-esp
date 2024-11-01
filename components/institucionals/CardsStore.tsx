import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import TitleContent from "./TitleContent.tsx";
import ContainerContent from "$store/components/institucionals/ContainerContent.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface DeviceImage {
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
  alt?: string;
}

interface Card {
  image: {
    src: ImageWidget;
    alt?: string;
  };
  label: string;
  address: HTMLWidget;
  linkMap?: string;
}

export interface Props {
  title: string;
  description: string;
  cards: Card[];
}

export default function BannerGridText({ title, description, cards }: Props) {
  return (
    <ContainerContent>
      <TitleContent title={title} />
      <h2 class={`text-base md:text-lg font-medium text-black text-opacity-60`}>
        {description}
      </h2>
      <div class={`flex flex-wrap justify-center gap-6`}>
        {cards.map((card) => {
          return (
            <div
              class={`w-2/5 min-w-[311px] md:min-w-64 max-w-[275px] min-h-[332px] flex flex-col p-4 gap-4 rounded-2xl border border-black border-opacity-15`}
            >
              <Image
                class="rounded-lg w-full object-cover h-[144px]"
                src={card.image.src}
                alt={card.image.alt || card.label}
                width={243}
                height={144}
                loading="lazy"
              />
              <h2 class={`text-base text-primary-content font-bold leading-5`}>
                {card.label}
              </h2>
              <div
                class={`h-[54px] text-sm text-black text-opacity-60 font-medium leading-[17.5px]`}
                dangerouslySetInnerHTML={{ __html: card.address }}
              />
              <a
                href={card.linkMap}
                class={`w-max flex text-primary text-sm font-semibold border border-primary rounded-lg gap-2.5 items-center justify-center px-4 py-2.5`}
              >
                <Icon
                  id={"MapIcon"}
                  width={18}
                  height={15}
                  strokeWidth={1}
                  class="text-primary"
                />
                Ver no mapa
              </a>
            </div>
          );
        })}
      </div>
    </ContainerContent>
  );
}
