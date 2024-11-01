import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div class="flex flex-col justify-center items-center overflow-hidden">
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6 text-primary-content">
            <span class="font-medium text-2xl">Sua sacola está vazia</span>
            <Button
              class="btn-outline border-primary text-primary-content"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            <div class="px-3.5 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Items */}
            <ul
              role="list"
              class="lg:scroll-menu mt-6 px-3.5 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
            >
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full">
              {/* Subtotal */}
              <div class="border-t border-base-200 py-2 flex flex-col">
                {onAddCoupon && (
                  <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
                )}
              </div>
              {discounts > 0 && (
                <div class="flex justify-between items-center px-4">
                  <span class="text-xs text-black opacity-60 font-semibold">
                    Descontos
                  </span>
                  <span class="text-sm text-primary font-bold">
                    {formatPrice(discounts, currency, locale)}
                  </span>
                </div>
              )}
              {/* Total */}
              <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 mx-4">
                <div class="flex justify-between items-center w-full">
                  <span class={`text-xs text-black opacity-60 font-semibold`}>
                    TOTAL (SEM FRETE)
                  </span>
                  <span class={`text-sm text-primary font-bold`}>
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
              </div>

              <div class="p-4 flex flex-col items-center justify-center gap-2">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="btn-accent rounded-[500px] text-white flex gap-4 items-center justify-center w-full"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    <Icon id="bagBuyBtn" width={14} height={16} />
                    <span class={`leading-none text-sm`}>FINALIZAR COMPRA</span>
                  </Button>
                </a>
                <Button
                  class={`w-full h-12 border border-gray-200 rounded-[500px] text-primary-content`}
                  onClick={() => {
                    displayCart.value = false;
                  }}
                >
                  CONTINUAR COMPRANDO
                </Button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
