/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */
import { signal } from "@preact/signals";
import type { AggregateOffer, Product } from "apps/commerce/types.ts";
import { ImageObject } from "apps/commerce/types.ts";

const displayCart = signal(false);
const displayMenu = signal(false);
const displayMenuInstitucional = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const displayMenuProducts = signal(false);
const displayMenuProductsChild = signal(false);
const productsChild = signal({ label: "", children: [], href: "" });
const productsChild2 = signal({
  label: "",
  children: [{ type: "", label: "", href: "" }],
  href: "",
});
const userEmail = signal("");
const userLogged = signal(false);
const skuIDCart = signal("");
const urlSkuVariant = signal("");
const productSimilar = signal<Product | undefined>(undefined);
const productOfferSimilar = signal<AggregateOffer | undefined>(undefined);
const imagesProductSimilar = signal<ImageObject[] | []>([]);
const productNameSimilar = signal("");
const productModelSimilar = signal("");
const productColor = signal("");
const modalCookies = signal(false);

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  displayMenuProducts,
  userEmail,
  userLogged,
  productsChild,
  productsChild2,
  displayMenuProductsChild,
  skuIDCart,
  urlSkuVariant,
  productSimilar,
  imagesProductSimilar,
  productNameSimilar,
  productModelSimilar,
  displayMenuInstitucional,
  productOfferSimilar,
  modalCookies,
  productColor,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
