import IconHeart from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/heart.tsx";
import { CartButton, MenuButton } from "$store/islands/Gaston/Buttons.tsx";
import { navbarHeight } from "../../header/constants.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import ImageComponent from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import LoginButton from "$store/islands/Gaston/LoginButton.tsx";
import Icon from "site/components/ui/Icon.tsx";

function Navbar({ paths, logo, device }: {
  logo?: { src: LiveImage; alt: string };
  paths: { loginHref: string; favouriteHref: string };
  device: "mobile" | "desktop" | "tablet";
}) {
  const id = useId();

  if (device === "mobile") {
    return (
      <>
        {/* Mobile Version */}
        <div
          style={{ height: navbarHeight }}
          class="xl:hidden w-full text-primary"
        >
          <div class="w-11/12 m-auto flex flex-row justify-between items-center gap-4">
            <MenuButton />

            {logo && (
              <a
                href="/"
                class="flex-grow justify-center flex items-center h-[42px] w-[238px] object-contain"
                style={{ minHeight: navbarHeight }}
                aria-label="Store logo"
              >
                <ImageComponent
                  class="object-contain"
                  src={logo.src}
                  alt={logo.alt}
                  width={110}
                  height={28}
                />
              </a>
            )}

            <div class="flex gap-1">
              <a
                class="btn btn-circle btn-sm btn-ghost"
                href={paths.favouriteHref}
                aria-label="Wishlist"
              >
                <Icon id="Heart" strokeWidth={1} class="w-5 h-[19px]" />
              </a>
              <CartButton />
            </div>
          </div>
        </div>
      </>
    );
  }
  // Desktop Version
  return (
    <>
      <div class="hidden lg:flex py-4 items-center m-auto w-11/12  max-w-[1300px] justify-between gap-8 max-h-[85px]">
        {logo && (
          <a
            href="/"
            aria-label="Store logo"
            class="flex items-center py-3 h-[30px] w-[117px]"
          >
            <ImageComponent
              class="w-full"
              src={logo.src}
              alt={logo.alt}
              width={117}
              height={30}
            />
          </a>
        )}
        <form
          action="/s"
          method="GET"
          id={id}
          class="min-h-[40px] relative w-1/2"
        >
          <input
            className="w-full placeholder:text-primary-content p-2 text-base pl-5 text-black h-[51px] bg-base-300 rounded-full border border-solid border-gray-200"
            type="text"
            name="q" // Adicione o atributo 'name' com o valor 'q'
            placeholder="Busque por tênis, mochila..."
          />
          <button
            type="submit"
            aria-label="Search"
            class={`absolute right-8 top-4`}
          >
            <Icon
              id={"MagnifyingGlass"}
              size={17}
              strokeWidth={1}
              class="text-primary-content"
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
        <div class="flex items-center gap-6">
          <LoginButton loginHref={paths.loginHref} />
          <a
            class="text-primary"
            href={paths.favouriteHref}
            aria-label="Wishlist"
          >
            <Icon id="Heart" strokeWidth={1} class="w-5 h-[19px]" />
          </a>
          <CartButton />
        </div>
      </div>
    </>
  );
}

export default Navbar;
