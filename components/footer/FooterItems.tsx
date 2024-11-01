import { useDevice } from "@deco/deco/hooks";


export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {

  const device = useDevice()
  const isMobile = device == "mobile"

  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          {
            !isMobile ?
              <ul
                class={`hidden md:flex flex-row gap-6 lg:gap-12 lg:w-full ${justify && "lg:justify-between"
                  }`}
              >
                {sections.map((section) => (
                  <li class={`border-l border-gray-200 pl-10`}>
                    <div class="flex flex-col gap-2">
                      <h6 class="font-bold text-lg text-primary-content">
                        {section.label}
                      </h6>
                      <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                        {section.items?.map((item) => (
                          <li>
                            <a
                              href={item.href}
                              class="block py-1 link link-hover text-primary-content"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
              :
              < ul class="flex flex-col md:hidden gap-10">
                {/* Mobile view */}
                {sections.map((section) => (
                  <li>
                    <h6 class={"text-base text-primary-content font-bold"}>
                      {section.label}
                    </h6>
                    <ul class={`flex flex-col gap-1 pt-2`}>
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="text-black opacity-60 font-thin text-base"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
          }
        </>
      )
      }
    </>
  );
}
