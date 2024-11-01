import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import Icon from "site/components/ui/Icon.tsx";

export default function CartButton() {
  const { displayCart, displayMenu } = useUI();
  const { loading, cart } = useCart();
  const totalItems = cart.value?.items.length || null;

  const onClick = () => {
    displayCart.value = true;
    displayMenu.value = false;
  };

  return (
    <div class="indicator">
      {totalItems && (
        <span class="indicator-item badge badge-primary badge-sm p-2 top-[5px] text-white">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
      <Button
        class="btn-circle btn-sm p-1 lg:px-4 lg:py-3.5 lg:h-auto lg:w-auto lg:bg-base-content"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading.value}
        onClick={onClick}
      >
        <Icon id="ShoppingCart" strokeWidth={1} class="w-[18px] h-[21px]" />
      </Button>
    </div>
  );
}
