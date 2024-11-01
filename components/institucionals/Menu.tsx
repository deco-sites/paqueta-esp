import { Section } from "deco/blocks/section.ts";
import type { SectionProps } from "deco/types.ts";
import { AppContext } from "site/apps/site.ts";
import DrawerInstitucional from "$store/islands/DrawerInstitucional.tsx";

/**
 * @title {{{text}}}
 */
interface Links {
  text: string;
  href: string;
  /** @title Abrir em nova aba? */
  isBlank?: boolean;
}
/**
 * @title {{{title}}}
 */
interface Menu {
  title: string;
  links: Links[];
}
export interface Props {
  menu: Menu[];
}

export function Links({ menu, url, device }: SectionProps<typeof loader>) {
  return (
    <div class="flex flex-col gap-6 p-4 md:p-0">
      {menu.map(({ links, title }) => (
        <div class="flex flex-col gap-6">
          <h2 class="text-primary-content text-xl font-bold">
            {title}
          </h2>
          <ul class="flex flex-col gap-4">
            {links.map(({ href, text, isBlank }) => (
              <li
                class={`${
                  url.includes(href) && "border-l-[3px] border-primary"
                } pl-2.5 flex justify-start gap-2.5 items-center`}
              >
                <a
                  href={href}
                  class={`text-primary-content text-base`}
                  target={isBlank ? "_blank" : "_self"}
                  rel={isBlank ? "noopener noreferrer" : ""}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Menu({
  menu,
  url,
  device,
}: SectionProps<typeof loader>) {
  return (
    <>
      <DrawerInstitucional
        children={<Links menu={menu} url={url} device={device} />}
      />
      <div class={`hidden md:flex`}>
        <Links menu={menu} url={url} device={device} />
      </div>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device, url: _req.url };
};

export default Menu;
