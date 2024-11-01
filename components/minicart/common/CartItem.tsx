import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  skuID: string;
  productGroupID: string;
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const {
    image,
    name,
    price: { sale, list },
    quantity,
    skuID,
    productGroupID,
  } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="grid grid-rows-1 lg:flex gap-2 bg-[#F7F7F7] border border-gray-200 rounded-2xl p-2"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        {...image}
        src={image.src.replace("55-55", "255-255")}
        style={{ aspectRatio: "70 / 70" }}
        width={70}
        height={70}
        class="h-[70px] object-contain rounded-lg lg:h-[120px] lg:w-[120px]"
      />

      <div class="flex flex-col gap-2 pl-3 text-primary-content">
        <div class="flex justify-between items-center">
          <span class={`text-xs font-semibold lg:text-base`}>{name}</span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: {
                  items: [{
                    ...analyticsItem,
                    item_id: `${productGroupID}_${skuID}`,
                  }],
                },
              });
            })}
          >
            <Icon id="Trash" size={24} class={`text-primary`} />
          </Button>
        </div>
        <div class="flex items-center gap-2">
          {list > sale &&(
            <span class="line-through text-base">
              {formatPrice(list, currency, locale)}
            </span>
          )}
          <span class="text-base text-primary font-bold lg:text-xl">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>
        <div class={`hidden lg:flex items-center justify-between gap-2`}>
          <span class={`font-semibold text-sm text-primary-content`}>
            QUANTIDADE:
          </span>
          <QuantitySelector
            disabled={loading || isGift}
            quantity={quantity}
            onChange={withLoading(async (quantity) => {
              const analyticsItem = itemToAnalyticsItem(index);
              const diff = quantity - item.quantity;

              await onUpdateQuantity(quantity, index);

              if (analyticsItem) {
                sendEvent({
                  name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: {
                    items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                  },
                });
              }
            })}
          />
        </div>
      </div>
      <div
        class={`grid col-start-1 col-end-3 lg:hidden grid-cols-auto-1 items-center gap-4`}
      >
        <span class={`font-semibold text-xs text-primary-content`}>
          QUANTIDADE:
        </span>
        <QuantitySelector
          disabled={loading || isGift}
          quantity={quantity}
          onChange={withLoading(async (quantity) => {
            const analyticsItem = itemToAnalyticsItem(index);
            const diff = quantity - item.quantity;

            await onUpdateQuantity(quantity, index);

            if (analyticsItem) {
              sendEvent({
                name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                },
              });
            }
          })}
        />
      </div>
    </div>
  );
}

export default CartItem;
