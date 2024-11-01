import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import FiltersSelected from "$store/components/search/FiltersSelected.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2 max-w-[230px]">
      <div
        aria-checked={selected}
        class="checkbox border-black border-opacity-60 w-4 h-4 [--chkbg:theme(colors.primary)] [--chkfg:white]"
      />
      <span class="text-sm text-black text-opacity-60">{label}</span>
      {quantity > 0 && (
        <span class="text-sm text-black text-opacity-60">({quantity})</span>
      )}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  return (
    <ul class={`collapse-content flex gap-3 flex-col`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        // if (key === "cor" || key === "tamanho") {
        //   return (
        //     <a href={url} rel="nofollow">
        //       <Avatar
        //         content={value}
        //         variant={selected ? "active" : "default"}
        //       />
        //     </a>
        //   );
        // }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}
const portugueseMappings = {
  "Departments": "Departamentos",
  "PriceRanges": "Preço",
  "Categories": "Categorias",
  "Brands": "Marcas",
};

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 p-4 text-primary-content lg:rounded-2xl bg-white lg:border lg:border-black lg:border-opacity-10 lg:drop-shadow-md">
      <span
        class={`hidden lg:flex text-2xl font-bold leading-none text-primary-content`}
      >
        Filtros
      </span>
      <FiltersSelected filters={filters} />
      {filters
        .filter(isToggle)
        .map((filter) => {
          if (filter.quantity > 0) {
            return (
              <li class="collapse collapse-plus bg-base-200 border border-black border-opacity-10 rounded-lg">
                <input type="checkbox" class={`h-10 min-h-10`} />
                <span
                  class={`collapse-title text-sm font-bold p-3 min-h-10 text-primary-content`}
                >
                  {portugueseMappings[
                    filter.label as keyof typeof portugueseMappings
                  ] ?? filter.label}
                </span>
                <FilterValues {...filter} />
              </li>
            );
          }
          <></>;
        })}
    </ul>
  );
}

export default Filters;
