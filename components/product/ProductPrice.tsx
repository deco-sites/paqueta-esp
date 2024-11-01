import { useUI } from "site/sdk/useUI.ts";
import { formatPrice } from "site/sdk/format.ts";
import { useOffer } from "site/sdk/useOffer.ts";

export interface Props {
  prodlistPrice?: number;
  prodprice?: number;
  prodinstallments?: string | null;
  priceCurrency?: string;
  device?: "mobile" | "tablet" | "desktop";
}

export default function ProductPrice(
  { prodlistPrice, prodprice, prodinstallments, priceCurrency, device }: Props,
) {
  const { productOfferSimilar } = useUI();
  let newPrice, newListPrice, newInstallments;

  if (productOfferSimilar.value) {
    const { price, listPrice, installments } = useOffer(
      productOfferSimilar.value,
    );
    newPrice = price;
    newListPrice = listPrice;
    newInstallments = installments;
  } else {
    newPrice = prodprice;
    newListPrice = prodlistPrice;
    newInstallments = prodinstallments;
  }

  if (device == "desktop") {
    return (
      <>
        <div class="flex flex-col gap-2 border-b border-black border-opacity-15 pb-4">
          <div class={`flex gap-2 items-end`}>
            {newPrice && (newListPrice ?? 0) > newPrice && (
              <span class="line-through text-primary-content text-sm font-semibold leading-4">
                {formatPrice(newListPrice, priceCurrency)}
              </span>
            )}
            <span class="font-bold text-2xl text-primary leading-7">
              {formatPrice(newPrice, priceCurrency)}
            </span>
          </div>
          <span class="text-sm text-primary-content font-bold leading-4">
            {newInstallments}
          </span>
        </div>
      </>
    );
  }
  return (
    <>
      <div class="flex flex-row gap-2 items-center">
        {newPrice && (newListPrice ?? 0) > newPrice && (
          <span class="line-through text-primary-content text-sm font-semibold leading-4">
            {formatPrice(newListPrice, priceCurrency)}
          </span>
        )}
        <span class="font-bold text-2xl text-primary leading-7">
          {formatPrice(newPrice, priceCurrency)}
        </span>
        <span class="border-l border-black border-opacity-15 pl-3 text-sm text-primary-content font-bold leading-4">
          {newInstallments}
        </span>
      </div>
    </>
  );
}
