import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  _class?: string;
}

function Breadcrumb({ itemListElement = [], _class }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class={`breadcrumbs text-primary-content text-sm ${_class}`}>
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class={`last:text-primary last:before:text-primary-content`}>
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
