import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/vtex.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "$store/sdk/url.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
  /**@hidden */
  type?: "PLP" | "HOME" | "PDP"
}

const WIDTH = 304;
const HEIGHT = 304;

function ProductCard({
  product,
  preload,
  itemListName,
  layout,
  platform,
  index,
  type = "HOME"
}: Props) {
  const { url, productID, image: images, offers, isVariantOf } = product;
  const name = isVariantOf?.name;
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const relativeUrl = relative(url);
  const cta = (
    <a
      href={url?.split("?sku")[0]}
      aria-label="view product"
      class="bg-accent flex gap-3 justify-center items-center duration-200 rounded-[500px] px-6 py-3.5 w-full text-sm uppercase lg:hover-bag font-bold text-white lg:w-[165px] lg:bg-transparent lg:border lg:border-primary-content lg:text-primary-content lg:hover:bg-accent lg:hover:text-white lg:hover:border-accent"
    >
      <Icon
        id="bagBuyBtn"
        width={14}
        height={16}
        class={`lg:text-primary-content duration-200`}
      />
      {l?.basics?.ctaText || "Comprar"}
    </a>
  );

  return (
    <div
      id={id}
      class={`card card-compact group w-full text-primary-content ${align === "center" ? "text-center" : "text-start"
        } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
        }
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}

        <div
          class={`absolute top-2 lg:top-4 justify-between w-[90%] z-10 flex items-center
            ${l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2 lg:right-3.5"
            }
            
          `}
        >
          <div
            class={`${l?.hide?.favoriteIcon ? "hidden" : "block"} ${l?.onMouseOver?.showFavoriteIcon ? "lg:group-hover:block" : ""
              }`}
          >
            {platform === "vtex" && (
              <WishlistButtonVtex
                productGroupID={productGroupID}
                productID={productID}
                _class={`h-[30px] min-h-[30px] w-[30px]`}
              />
            )}
          </div>
          {/* Discount % */}
          {!l?.hide?.discount && (
            <>
              {listPrice && price && listPrice != price &&
                (
                  <>
                    <div class="text-xs lg:text-sm bg-secondary py-1.5 px-2 lg:py-2 lg:px-3 rounded-[500px]">
                      <span class="text-primary font-bold">
                        {Math.round(((listPrice - price) / listPrice) * 100)}%
                      </span>
                    </div>
                  </>
                )}
            </>
          )}
        </div>

        {/* Product Images */}
        <a
          href={url?.split("?sku")[0]}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 rounded-2xl border border-black border-opacity-10 col-span-full row-span-full w-full ${l?.onMouseOver?.image == "Zoom image"
              ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
              : ""
              }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                class="bg-base-100 rounded-2xl border border-black border-opacity-10 col-span-full row-span-full transition-opacity w-full opacity-0 lg:group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
            }`}
        >
          {
            /* SKU Selector
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )} */
          }
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-2 gap-3">
        {
          /* SKU Selector
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector
              ? (
                ""
              )
              : (
                <ul
                  class={`flex items-center gap-2 w-full overflow-auto p-3 ${
                    align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
          </>
        )} */
        }

        {l?.hide?.productName && l?.hide?.productDescription
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-0">
              {l?.hide?.productName
                ? (
                  ""
                )
                :
                type == "HOME" ?
                  (
                    <>
                      <h3 class="lg:hidden text-base leading-5 h-10 max-h-10 overflow-hidden text-primary-content font-normal">
                        {name && name.length > 35
                          ? name?.slice(0, 30) + "..."
                          : name}
                      </h3>
                      <h3 class="hidden lg:flex text-base leading-5 min-h-[42px] h-[42px] overflow-hidden text-primary-content font-normal">
                        {name && name.length > 60
                          ? name?.slice(0, 60) + "..."
                          : name}
                      </h3>
                    </>
                  )
                  :
                  type == "PLP" ?
                    (
                      <>
                        <h2 class="lg:hidden text-base leading-5 h-10 max-h-10 overflow-hidden text-primary-content font-normal">
                          {name && name.length > 35
                            ? name?.slice(0, 30) + "..."
                            : name}
                        </h2>
                        <h2 class="hidden lg:flex text-base leading-5 min-h-[42px] h-[42px] overflow-hidden text-primary-content font-normal">
                          {name && name.length > 60
                            ? name?.slice(0, 60) + "..."
                            : name}
                        </h2>
                      </>
                    ) :
                    (
                      <>
                        <h3 class="lg:hidden text-base leading-5 h-10 max-h-10 overflow-hidden text-primary-content font-normal">
                          {name && name.length > 35
                            ? name?.slice(0, 30) + "..."
                            : name}
                        </h3>
                        <h3 class="hidden lg:flex text-base leading-5 min-h-[42px] h-[42px] overflow-hidden text-primary-content font-normal">
                          {name && name.length > 60
                            ? name?.slice(0, 60) + "..."
                            : name}
                        </h3>
                      </>
                    )
              }
              {l?.hide?.productDescription
                ? (
                  ""
                )
                : (
                  <div
                    class="truncate text-sm lg:text-sm text-neutral"
                    dangerouslySetInnerHTML={{ __html: description ?? "" }}
                  />
                )}
            </div>
          )}
        {l?.hide?.allPrices
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-2">
              <div
                class={`flex gap-2 ${l?.basics?.oldPriceSize === "Normal"
                  ? "lg:flex-row-reverse lg:gap-2"
                  : ""
                  } ${align === "center"
                    ? "justify-center"
                    : "justify-start items-center"
                  }`}
              >
                {listPrice && price && listPrice > price &&
                  (
                    <div
                      class={`line-through text-primary-content text-sm font-medium ${l?.basics?.oldPriceSize === "Normal" ? "lg:text-sm" : ""
                        }`}
                    >
                      {formatPrice(listPrice, offers?.priceCurrency)}
                    </div>
                  )}
                <div class="text-primary lg:text-xl font-bold">
                  {formatPrice(price, offers?.priceCurrency)}
                </div>
              </div>
            </div>
          )}
        {
          /* {l?.hide?.installments
                ? (
                  ""
                )
                : (
                  <li>
                    <span class="text-base-300 font-light text-sm truncate">
                      ou {installments}
                    </span>
                  </li>
                )} */
        }

        {
          /* SKU Selector
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            <ul
              class={`flex items-center gap-2 w-full ${
                align === "center" ? "justify-center" : "justify-between"
              } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
            >
              {l?.hide?.skuSelector
                ? (
                  ""
                )
                : (
                  <li>
                    <ul class="flex items-center gap-2">{skuSelector}</ul>
                  </li>
                )}
            </ul>
          </>
        )} */
        }
        {!l?.hide?.cta
          ? (
            <div
              class={`flex-auto flex items-end ${l?.onMouseOver?.showCta ? "lg:hidden" : ""
                }`}
            >
              {cta}
            </div>
          )
          : (
            ""
          )}
      </div>
    </div>
  );
}

export default ProductCard;
