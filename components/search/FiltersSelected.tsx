import type { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

function FiltersSelected({ filters }: Props) {
  const filteredArrays = filters
    .map((filter) => (filter.values as []).filter(({ selected }) => selected))
    .filter((array) => array.length > 0);

  const flatArray = [...filteredArrays.flat()];

  const removeAllFilters = () => {
    try {
      const urlObject = new URL(window.location.href);
      const searchParams = urlObject.searchParams;

      // Verifica se o parâmetro 's?q' existe na URL
      if (searchParams.has("s?q")) {
        const searchTerm = searchParams.get("s?q");
        return `/s?q=${searchTerm}`;
      } else {
        // Verifica se o parâmetro 'q' existe na URL
        if (searchParams.has("q")) {
          const searchTerm = searchParams.get("q");
          return `/s?q=${searchTerm}`;
        } else {
          return (globalThis.location.pathname);
        }
      }
    } catch (error) {
      return (globalThis.location.pathname);
    }
  };

  return (
    <>
      {flatArray.length > 0 && (
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-row justify-between items-center">
            <p class="font-bold text-sm">Selecionados:</p>

            <a href={globalThis.location.pathname} class="md:hidden">
              <button class="flex border border-primary text-primary flex-grow md:hidden justify-center items-center px-4 py-2.5 rounded-lg gap-2.5 w-full">
                <Icon id="Trash" size={15} class="text-primary" />
                <span class={`text-sm font-semibold`}>Limpar filtros</span>
              </button>
            </a>
          </div>
          {flatArray.map(({ label, url }) => (
            <a href={url}>
              <span class="flex gap-2 items-center text-sm font-medium">
                <Icon id="XMark" size={10} class="text-primary" />
                <p>
                  {label}
                </p>
              </span>
            </a>
          ))}

          <a href={removeAllFilters()} class="hidden md:block">
            <button class="hidden border border-primary flex-grow md:flex justify-center items-center p-1.5 rounded-lg gap-2.5 text-primary w-full">
              <Icon id="Trash" size={15} class="text-primary" />
              <span class={`text-sm font-semibold`}>Limpar filtros</span>
            </button>
          </a>
        </div>
      )}
    </>
  );
}

export default FiltersSelected;
