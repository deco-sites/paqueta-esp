/// SDK

import { mapProductToAnalyticsItem as mapper } from "apps/commerce/utils/productToAnalyticsItem.ts";

type Base = Parameters<typeof mapper>[0];

type Options = Base & {
  item_list_name?: string;
  item_list_id?: string;
  productID?: string;
  productGroupID?: string;
  skuID?: string;
};

export const mapProductToAnalyticsItem = (opts: Options) => ({
  ...mapper(opts),
  item_id: `${opts.productGroupID}_${opts.skuID}`,
  item_list_name: opts.item_list_name,
  item_list_id: opts.item_list_id,
  currency: "BRL",
  affiliation: "Gaston",
});
