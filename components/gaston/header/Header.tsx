import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Drawers from "$store/islands/Gaston/Drawers.tsx";
import { useId } from "$store/sdk/useId.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";
import Alert from "./Alert.tsx";
import NavBar from "./NavBar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import NavItem from "./NavItem.tsx";
import ScrollableContainer from "$store/components/gaston/header/ScrollableContainer.tsx";

export interface lastChild {
  type: "navItem" | "sizeItem";
  label: string;
  href?: string;
}
interface INavItem {
  label: string;
  href?: string;
  children?: lastChild[];
}
export interface MenuNavItem {
  label: string;
  href?: string;
  children?: INavItem[];
  destaque?: boolean;
}

interface ItemSocial {
  icon: "Central" | "Instagram" | "Facebook" | "WhatsApp";
  href: string;
  text?: string;
  openNewTab?: boolean;
}
export interface Social {
  sociais: ItemSocial[];
}
interface links {
  logo: ImageWidget;
  alt: string;
  href: string;
}
export interface Props {
  alerts: links[];

  /**
   * @title Social Media
   */
  social: Social;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems: MenuNavItem[];

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };

  paths: { loginHref: string; favouriteHref: string };
  ShippingPrice: number;
}

function Header({
  alerts,
  navItems = [],
  logo,
  social,
  paths,
  ShippingPrice,
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const id = useId();
  return (
    <>
      <header class=" h-[160px] lg:h-[173px]">
        <Drawers
          menu={{ items: navItems }}
          logo={logo}
          ShippingPrice={ShippingPrice}
          platform={platform}
          device={device}
        >
          <div class="bg-base-100 w-full z-20 h-auto border-b border-[#552B9A1A] border-opacity-10 xl:relative">
            <ScrollableContainer type="Alert">
              <div class="w-full bg-base-300">
                <div class="w-11/12 max-w-[1300px] gap-6 flex m-auto items-center justify-between">
                  <Alert alerts={alerts} />
                  <ul class="hidden lg:flex items-center text-[0.56em] justify-end text-primary-content">
                    {social.sociais.map((item) => {
                      return (
                        <>
                          <li
                            class={`px-4 border-r border-r-black border-opacity-[12%] `}
                          >
                            <a
                              href={item.href}
                              target={item.openNewTab ? "_blank" : "_self"}
                              class="flex gap-2 items-center text-sm"
                            >
                              <Icon
                                id={item.icon}
                                size={16}
                                stroke-width={1}
                                class="text-primary-content"
                              />
                              {item.text &&
                                <>{item.text}</>}
                            </a>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </ScrollableContainer>

            <div class="w-full lg:relative lg:bg-white lg:z-20">
              <NavBar paths={paths} logo={logo} device={device} />
            </div>
            {navItems.length > 0 && device == "desktop" &&
              (
                <ScrollableContainer type="Menu">
                  <ul class="hidden lg:flex justify-center w-full items-center text-base min-h-[50px] bg-primary">
                    {navItems.map((item, index) => (
                      <NavItem
                        item={item}
                        lastIndex={index === navItems.length - 1}
                      />
                    ))}
                  </ul>
                </ScrollableContainer>
              )}
            {device === "mobile" &&
              (
                <div className="w-[100%] xl:hidden relative px-4 py-1.5 border-b-[1px] border-solid border-gray-200">
                  <form
                    action="/s"
                    method="GET"
                    id={id}
                    class="min-h-[40px] "
                  >
                    <input
                      className="w-full py-3 px-4 placeholder:text-primary-content text-base text-black h-[41px] bg-base-300 rounded-full border border-solid border-gray-200"
                      type="text"
                      name="q" // Adicione o atributo 'name' com o valor 'q'
                      placeholder="Busque por tênis, mochila..."
                    />
                    <button type="submit" aria-label="Search">
                      <IconSearch
                        className="w-5 h-5 right-[33px] absolute -top-[1px] bottom-0 m-auto text-[#1e1e1e]"
                        style={{ position: "absolute" }}
                      />
                    </button>
                  </form>
                  <script
                    src={scriptAsDataURI((id: string) => {
                      const elem = document.getElementById(id);
                      if (!elem) return;
                      // deno-lint-ignore no-explicit-any
                      elem.addEventListener("submit", (e: any) => {
                        window.DECO.events.dispatch({
                          name: "search",
                          params: {
                            search_term: e.currentTarget.elements["q"].value,
                          },
                        });
                      });
                    }, id)}
                  />
                </div>
              )}
          </div>
        </Drawers>
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
