import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSignal } from "@preact/signals";
import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  images: ImageObject[];
  width: number;
  height: number;
}

function ProductImageZoom({ images, width, height }: Props) {
  const id = useId();
  const open = useSignal(false);

  return (
    <>
      <Button
        class="absolute top-2 left-2 lg:top-3 lg:left-3 text-primary-content btn-ghost h-9 min-h-9 px-2.5"
        onClick={() => open.value = true}
      >
        <Icon id="Zoom" size={24} />
      </Button>
      <div id={id}>
        <Modal
          loading="lazy"
          open={open.value}
          onClose={() => open.value = false}
        >
          <div class="modal-box relative w-11/12 max-w-7xl grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center">
            <Slider class="carousel col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
              {images.map((image, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full h-full justify-center items-center"
                >
                  <Image
                    style={{ aspectRatio: `${width} / ${height}` }}
                    src={image.url!}
                    alt={image.alternateName}
                    width={width}
                    height={height}
                    class="h-full w-auto"
                  />
                </Slider.Item>
              ))}
            </Slider>

            <Slider.PrevButton class="absolute left-3 lg:left-8 top-[45%] h-8 w-8 lg:h-11 lg:w-11 rounded-full bg-white flex border items-center justify-center border-black border-opacity-15 text-base">
              <Icon
                size={16}
                id="ChevronLeft"
                strokeWidth={3}
                class={`text-primary-content`}
              />
            </Slider.PrevButton>

            <Slider.NextButton class="absolute right-3 lg:right-8 top-[45%] h-8 w-8 lg:h-11 lg:w-11 rounded-full bg-white flex border items-center justify-center border-black border-opacity-15 text-base">
              <Icon
                size={16}
                id="ChevronRightFilter"
                strokeWidth={3}
                class={`text-primary-content`}
              />
            </Slider.NextButton>

            <SliderJS rootId={id} />
            <button
              class={`absolute top-3 right-3 rounded-full p-3`}
              onClick={() => open.value = false}
            >
              <Icon id="XMark" size={20} class={`text-primary-content`} />
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ProductImageZoom;
