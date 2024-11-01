import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
// import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import GallerySlider from "$store/islands/ProductImageSlider.tsx";
import ProductName from "$store/islands/ProductName.tsx";
import ProductPrice from "$store/islands/ProductPrice.tsx";
import { Section } from "deco/blocks/section.ts";
import ProductTags from "$store/components/product/ProductTags.tsx";
import ProductDescription from "$store/components/product/ProductDescription.tsx";
import type { Tag } from "$store/components/product/ProductTags.tsx";
import { mapProductToAnalyticsItem } from "$store/sdk/productAnalytics.ts";
interface Props {
  page: ProductDetailsPage | null;
  section?: Section;
  tags?: Tag[];
}

function ProductInfo(
  { page, device, section, tags }: SectionProps<typeof loader>,
) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product, breadcrumbList } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
    image: images = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const model = isVariantOf?.model || "";
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  return (
    <>
      <div class={`flex flex-col gap-4 bg-base-300`}>
        {device == "mobile" &&
          (
            <>
              <Breadcrumb
                itemListElement={breadcrumb.itemListElement}
                _class={`w-11/12 mx-auto max-w-[1300px]`}
              />
              <ProductName
                name={isVariantOf?.name || ""}
                device={device}
                model={model}
              />
            </>
          )}
        <div
          class={`flex flex-col gap-3 lg:flex-row lg:justify-between lg:w-11/12 lg:mx-auto lg:max-w-[1300px] lg:gap-10`}
        >
          <div class={`flex flex-col gap-3`}>
            {device == "desktop" &&
              (
                <>
                  <Breadcrumb
                    itemListElement={breadcrumb.itemListElement}
                    _class={`mt-9 pt-0 pb-2.5 mb-2.5 border-b border-black border-opacity-15`}
                  />
                </>
              )}
            <GallerySlider
              images={images}
              productID={productID}
              productGroupID={productGroupID}
            />
          </div>
          <div
            class={`flex flex-col gap-3 lg:w-[45%] lg:max-w-[530px] lg:mt-9`}
          >
            {device == "desktop" &&
              (
                <>
                  <ProductName
                    name={isVariantOf?.name || ""}
                    device={device}
                    model={model}
                  />
                  <ProductPrice
                    prodlistPrice={listPrice}
                    prodprice={price}
                    prodinstallments={installments}
                    priceCurrency={offers?.priceCurrency}
                    device={device}
                  />
                </>
              )}
            {/* Sku Selector */}
            <div class="w-11/12 mx-auto lg:w-full">
              <ProductSelector product={product} />
            </div>
            {device == "desktop" &&
              (
                <>
                  {availability === "https://schema.org/InStock"
                    ? (
                      <>
                        {platform === "vtex" && (
                          <>
                            <AddToCartButtonVTEX
                              eventParams={{ items: [eventItem] }}
                              productID={productID}
                              seller={seller}
                            />
                          </>
                        )}
                      </>
                    )
                    : <OutOfStock productID={productID} />}
                </>
              )}
            {/* Shipping Simulation */}
            <div class="w-11/12 mx-auto lg:w-full">
              {platform === "vtex" && (
                <ShippingSimulation
                  items={[
                    {
                      id: Number(product.sku),
                      quantity: 1,
                      seller: seller,
                    },
                  ]}
                />
              )}
            </div>
            {device == "mobile" &&
              (
                <>
                  {/* Add to Cart and Favorites button */}
                  <div class="z-40 fixed bottom-0 w-full bg-white border-t border-black border-opacity-10 flex flex-col gap-4 p-4">
                    {/* Prices */}
                    <ProductPrice
                      prodlistPrice={listPrice}
                      prodprice={price}
                      prodinstallments={installments}
                      priceCurrency={offers?.priceCurrency}
                      device={device}
                    />
                    {availability === "https://schema.org/InStock"
                      ? (
                        <>
                          {platform === "vtex" && (
                            <>
                              <AddToCartButtonVTEX
                                eventParams={{ items: [eventItem] }}
                                productID={productID}
                                seller={seller}
                              />
                            </>
                          )}
                          {platform === "wake" && (
                            <>
                              <AddToCartButtonWake
                                eventParams={{ items: [eventItem] }}
                                productID={productID}
                              />
                              <WishlistButtonWake
                                variant="full"
                                productID={productID}
                                productGroupID={productGroupID}
                              />
                            </>
                          )}
                          {platform === "linx" && (
                            <AddToCartButtonLinx
                              eventParams={{ items: [eventItem] }}
                              productID={productID}
                              productGroupID={productGroupID}
                            />
                          )}
                          {platform === "vnda" && (
                            <AddToCartButtonVNDA
                              eventParams={{ items: [eventItem] }}
                              productID={productID}
                              additionalProperty={additionalProperty}
                            />
                          )}
                          {platform === "shopify" && (
                            <AddToCartButtonShopify
                              eventParams={{ items: [eventItem] }}
                              productID={productID}
                            />
                          )}
                          {platform === "nuvemshop" && (
                            <AddToCartButtonNuvemshop
                              productGroupID={productGroupID}
                              eventParams={{ items: [eventItem] }}
                              additionalProperty={additionalProperty}
                            />
                          )}
                        </>
                      )
                      : <OutOfStock productID={productID} />}
                  </div>
                </>
              )}
            {/* Analytics Event */}
            <SendEventOnView
              id={id}
              event={{
                name: "view_item",
                params: {
                  currency: "BRL",
                  value: price,
                  items: [
                    mapProductToAnalyticsItem({
                      item_list_name: "Product",
                      item_list_id: "product",
                      productGroupID: productGroupID,
                      skuID: productID,
                      product,
                      breadcrumbList: breadcrumb,
                      price,
                      listPrice,
                      index: 0,
                    }),
                  ],
                },
              }}
            />
          </div>
        </div>
        {section &&
          <section.Component {...section.props} />}
        {/* Description card */}
        <div class="flex flex-col w-11/12 mx-auto mt-6 mb-10 p-4 gap-8 bg-white border border-black border-opacity-10 rounded-xl max-w-[850px] lg:p-8">
          <ProductTags tags={tags} />
          <span class="text-sm">
            {description && <ProductDescription description={description} />}
          </span>
        </div>
      </div>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default ProductInfo;
