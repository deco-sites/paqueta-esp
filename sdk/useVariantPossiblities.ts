import type {
  Product,
  ProductLeaf,
  PropertyValue,
} from "apps/commerce/types.ts";
import { useOffer } from "site/sdk/useOffer.ts";

export type Possibilities = Record<
  string,
  Record<
    string,
    {
      url: string | undefined;
      available: boolean;
      productID: string;
      firstImage: string | undefined;
      color: string | undefined;
      productVariant: Product;
    }
  >
>;

const hash = ({ name, value }: PropertyValue) => `${name}::${value}`;

const omit = new Set(["category", "cluster", "RefId", "descriptionHtml"]);

export const useVariantPossibilities = (
  variants: ProductLeaf[],
  selected: ProductLeaf,
  selectedColor: string | undefined,
): Possibilities => {
  const possibilities: Possibilities = {};
  const selectedSpecs = new Set(selected.additionalProperty?.map(hash));
  for (const variant of variants) {
    const {
      url,
      additionalProperty = [],
      productID,
      offers,
      image = [],
    } = variant;
    const { availability } = useOffer(offers);
    const isSelected = productID === selected.productID;
    const specs = additionalProperty.filter(({ name }) => !omit.has(name!));

    const firstImage = image.length > 0 ? image[0].url : undefined;

    for (let it = 0; it < specs.length; it++) {
      const name = specs[it].name!;
      const value = specs[it].value!;

      if (omit.has(name)) continue;

      // Verificação: filtra apenas tamanhos da mesma cor selecionada
      if (name === "Tamanho") {
        const variantColor = variant.additionalProperty?.find(
          (prop) => prop.name === "Cor",
        )?.value;

        if (variantColor !== selectedColor) continue;
      }

      if (!possibilities[name]) {
        possibilities[name] = {};
      }

      const isSelectable = it === 0 ||
        specs.every((s) => s.name === name || selectedSpecs.has(hash(s)));

      possibilities[name][value] = {
        url: isSelected
          ? url
          : isSelectable
          ? possibilities[name][value]?.url || url
          : possibilities[name][value]?.url,
        available: availability == "https://schema.org/InStock",
        firstImage: isSelected
          ? firstImage
          : possibilities[name][value]?.firstImage || firstImage,
        productVariant: variant,
        color: variant.additionalProperty?.find(
          (prop) => prop.name === "Cor",
        )?.value as string | undefined,
        productID: isSelected
          ? productID
          : possibilities[name][value]?.productID || productID,
      };
    }
  }

  return possibilities;
};
