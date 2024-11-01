import Header from "$store/components/ui/SectionHeader.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText(
  { tag, label, description, alignment }: {
    tag?: string;
    label?: string;
    description?: string;
    alignment?: "center" | "left";
  },
) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-primary">{tag}</div>}
      {label && (
        <h2 class="text-xl leading-6 italic text-primary-content">{label}</h2>
      )}
      {description && (
        <div class="text-sm text-primary-content">{description}</div>
      )}
    </div>
  );
}

const DEFAULT_LIST = [
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
];

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = DEFAULT_LIST,
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div class={`bg-base-300 w-full py-8 lg:py-10`}>
      <div
        id={id}
        class="w-full lg:w-11/12 max-w-[1300px] mx-auto flex flex-col gap-8 lg:gap-10 text-base-content"
      >
        <Header
          title={header.title}
          description={header.description || ""}
          alignment={layout.headerAlignment || "center"}
        />

        <ul class="flex gap-6 lg:gap-8 pb-5 lg:pb-0 overflow-x-scroll lg:overflow-x-hidden justify-between items-center">
          {list.map((
            { tag, label, description, href, image, buttonText },
          ) => (
            <li class="flex flex-col gap-4 first:pl-4 sm:first:pl-0 last:pr-4 sm:last:pr-0">
              <a
                href={href}
                class="flex flex-col gap-4 lg:w-[18.8vw] lg:max-w-[287px] w-[250px]"
              >
                {layout.categoryCard?.textPosition === "top" &&
                  (
                    <CardText
                      tag={tag}
                      label={label}
                      description={description}
                      alignment={layout?.categoryCard?.textAlignment}
                    />
                  )}
                {image &&
                  (
                    <figure>
                      <Image
                        class="w-full rounded-3xl border border-black border-opacity-10 lg:h-[calc(18.7vw*(410/287))] lg:max-h-[410px]"
                        src={image}
                        alt={description || label || tag}
                        width={250}
                        height={357}
                        loading="lazy"
                      />
                    </figure>
                  )}
                {layout.categoryCard?.textPosition === "bottom" &&
                  (
                    <CardText
                      tag={tag}
                      label={label}
                      description={description}
                      alignment={layout?.categoryCard?.textAlignment}
                    />
                  )}
              </a>
              {buttonText &&
                <a href={href} class="btn">{buttonText}</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryList;
