import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import WishlistButtonVtex from "$store/islands/WishlistButton/vtex.tsx";
import { useUI } from "site/sdk/useUI.ts";
import ImageZoom from "site/islands/ProductImageZoom.tsx";
export interface Props {
  images: ImageObject[];
  productID: string;
  productGroupID: string;
}

export default function GallerySlider(
  { images, productID, productGroupID }: Props,
) {
  const id = useId();
  const { imagesProductSimilar, skuIDCart } = useUI();

  const newImages = imagesProductSimilar.value.length > 0
    ? imagesProductSimilar.value
    : images;
  const newProductId = skuIDCart.value ?? productID;
  const newProductGroupId = skuIDCart.value ?? productGroupID;

  return (
    <div id={id} class="grid grid-flow-row sm:grid-flow-col lg:gap-6">
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2">
        <Slider class="carousel carousel-center gap-6 w-screen lg:w-[40vw] lg:max-w-[520px]">
          {newImages.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full relative"
            >
              <Image
                class="w-full lg:max-w-[520px] lg:max-h-[520px] lg:mx-auto lg:border lg:border-black lg:border-opacity-15 lg:rounded-xl"
                src={img.url!}
                alt={img.alternateName}
                width={520}
                height={520}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <ImageZoom images={newImages} width={520} height={520} />
            </Slider.Item>
          ))}
        </Slider>

        {
          /* <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc(700)}
          />
        </div> */
        }
        <WishlistButtonVtex
          variant="icon"
          productID={newProductId}
          productGroupID={newProductGroupId}
          _class={`h-11 min-h-11 w-11 absolute right-3 top-3`}
        />
      </div>

      {/* Dots */}
      <ul class="carousel carousel-center gap-3 p-4 lg:p-0 lg:gap-3.5 sm:flex-col order-2 sm:order-1 lg:overflow-y-scroll lg:min-w-[120px] lg:h-[40vw] lg:max-h-[540px] lg:scroll-menu lg:pr-3">
        {newImages.map((img, index) => (
          <li class="carousel-item min-w-[63px] sm:min-w-[100px]">
            <Slider.Dot index={index}>
              <Image
                class="group-disabled:border-primary border-2 rounded-lg w-[86px] h-[86px] lg:w-[120px] aspect-square lg:h-auto"
                width={120}
                height={120}
                src={img.url!}
                alt={img.alternateName}
              />
            </Slider.Dot>
          </li>
        ))}
      </ul>
      <div class={`absolute`}>
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}
