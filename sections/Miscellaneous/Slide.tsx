import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface SlideProps {
  label: string;
  image: ImageWidget;
  alt?: string;
  href?: string;
}

export interface Props {
  content?: SlideProps[];
}

export default function Slide({
  content,
}: Props) {
  const slideContent = content?.map(({ label, image, alt, href }) => {
    return (
      <li class="flex items-center gap-x-10 mx-4">
        <a href={href}>
          <Image
            class="min-w-[120px] min-h-[68px] lg:min-w-[220px] lg:h-[125px]"
            src={image}
            alt={alt || label || ""}
            width={220}
            height={125}
            loading="lazy"
          />
        </a>
      </li>
    );
  });
  return (
    <div class="w-full bg-base-300 py-8 lg:py-16">
      <div class="relative overflow-hidden bg-base-100 w-11/12 max-w-[1300px] mx-auto border border-black border-opacity-10 rounded-3xl h-[99.65px] lg:h-[189px]">
        <ul class="animate-slide absolute top-4 left-4 flex flex-nowrap lg:top-8 lg:left-8">
          {slideContent}
          {slideContent}
        </ul>
      </div>
    </div>
  );
}
