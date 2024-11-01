export interface lastChild {
  type: "navItem" | "sizeItem";
  label: string;
  href?: string;
}
export interface INavItem {
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

function NavItem({ item }: { item: MenuNavItem; lastIndex: boolean }) {
  const { href, label, children, destaque } = item;

  return (
    <li class="group flex items-center relative">
      <a
        href={href}
        class={`px-8 py-2 ${destaque
          ? "text-white border border-white rounded-full py-1.5 px-5 "
          : " text-white"
          }`}
      >
        <span
          class={`${href ? "group-hover:underline" : ""} ${destaque ? "font-bold" : "font-thin"
            }  text-base`}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="absolute hidden menu-divide hover:flex w-[436px] h-[482px] group-hover:flex bg-base-100 z-50 items-start justify-start border-t-[1px] border-solid border-gray-200 group-hover:border-2 m-auto rounded-lg"
            style={{ top: "39px", left: "50%", transform: "translateX(-50%)" }}
          >
            <ul class="w-full h-full relative flex flex-col items-start p-4">
              <a
                href={href}
                class={`mb-2 leading-none text-primary border border-base-content rounded-[4px] w-[45%] py-2.5 px-5`}
              >
                Ver tudo
              </a>
              {children.map((node) => (
                <li class="menu-hover-desktop hover:border-l-[3px] hover:border-primary p-2 w-[52%] z-10">
                  <a
                    class="hover:underline font-thin"
                    href={node.href}
                  >
                    <span class="text-primary-content">{node.label}</span>
                  </a>
                  <ul
                    class={`${node.children !== undefined && node.children.length > 0
                      ? node.children[0].type == "sizeItem"
                        ? "flex-row flex-wrap h-auto gap-2 pr-0"
                        : "flex-col gap-2.5 h-full"
                      : "flex-col gap-2.5 h-full"
                      } hidden absolute overflow-y-scroll scroll-menu w-1/2 right-0 hover:flex top-0 p-4`}
                  >
                    {node.children !== undefined && node.children.length > 0 &&
                      (
                        <>
                          {node.children[0].type != "sizeItem" &&
                            (
                              <li>
                                <a class="hover:underline" href={node.href}>

                                  <span class="text-sm font-bold text-primary">
                                    Ver tudo em {node.label}
                                  </span>
                                </a>
                              </li>
                            )}
                        </>
                      )}
                    {node.children?.map((leaf) => (
                      <>
                        {leaf.type == "sizeItem"
                          ? (
                            <li
                              class={`w-[40px] h-[40px] bg-[#F7F7F7] rounded-full border border-black border-opacity-10 flex items-center justify-center`}
                            >
                              <a
                                href={leaf.href}
                                class={`text-black`}
                              >
                                {leaf.label}
                              </a>
                            </li>
                          )
                          : (
                            <li>
                              <a class="hover:underline" href={leaf.href}>
                                <span class="text-sm text-primary-content">
                                  {leaf.label}
                                </span>
                              </a>
                            </li>
                          )}
                      </>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
