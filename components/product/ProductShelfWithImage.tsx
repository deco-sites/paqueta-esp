import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "lg:min-w-[42%] lg:max-w-[327px]",
    4: "lg:min-w-[25%]",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "min-w-[50%] md:min-w-[32.8%]",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };
  return (
    <div class="w-full mx-auto max-w-[1300px] flex flex-col gap-6 lg:h-full">
      <div
        id={id}
        class={`flex relative items-center w-full lg:flex-col-reverse lg:justify-between lg:h-full`}
      >
        <Slider class="carousel carousel-center sm:carousel-end lg:w-full">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={`px-[3px] lg:px-4 ${
                slideMobile[layout?.numberOfSliders?.mobile ?? 1]
              } ${slideDesktop[layout?.numberOfSliders?.desktop ?? 3]}`}
            >
              <ProductCard
                product={product}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>
        <div
          class={`absolute w-full lg:relative -bottom-[60px] left-1/2 -translate-x-1/2 flex items-center justify-between gap-2 lg:w-full lg:justify-between lg:bottomUnset lg:pl-4`}
        >
          {layout?.showArrows && (
            <>
              <div class="block z-10 col-start-1 row-start-3">
                <Slider.PrevButton class="bg-white w-12 h-12 flex justify-center items-center border border-black border-opacity-10 rounded-[500px]">
                  <Icon
                    size={24}
                    id="ChevronLeft"
                    strokeWidth={3}
                    class="w-5 text-primary-content text-opacity-60"
                  />
                </Slider.PrevButton>
              </div>
            </>
          )}
          <ul class="bg-white lg:hidden bg-opacity-60 border border-white rounded-[500px] bottom-5 right-4 lg:right-16 carousel justify-center col-span-full gap-2 z-10 p-2.5 row-start-4">
            {products?.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot index={index} _class={`disabled:bg-primary`}>
                  <div class="">
                    <div class="w-2.5 h-2.5 rounded-full bg-primary bg-opacity-30" />
                  </div>
                </Slider.Dot>
              </li>
            ))}
          </ul>
          {layout?.showArrows && (
            <>
              <div class="block z-10 col-start-3 row-start-3">
                <Slider.NextButton class="bg-white w-12 h-12 flex justify-center items-center border border-black border-opacity-10 rounded-[500px]">
                  <Icon
                    size={24}
                    id="ChevronRightFilter"
                    strokeWidth={3}
                    class="w-5 text-primary-content text-opacity-60"
                  />
                </Slider.NextButton>
              </div>
            </>
          )}
        </div>
        <div class={`lg:absolute`}>
          <SliderJS rootId={id} />
        </div>
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;
