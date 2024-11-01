import { default as MenuButtonComponent } from "$store/components/gaston/header/buttons/Menu.tsx";
import { default as CartButtonComponent } from "$store/components/gaston/header/buttons/Cart.tsx";

export function CartButton() {
  return <CartButtonComponent />;
}

export function MenuButton() {
  return <MenuButtonComponent />;
}
