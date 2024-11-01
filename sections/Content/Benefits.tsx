import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  benefits?: Array<{
    text: HTMLWidget;
    icon: AvailableIcons;
  }>;
  layout?: {
    variation?: "Simple" | "With border";
  };
}

export default function Benefits(
  props: Props,
) {
  const {
    benefits = [{
      icon: "credCard",
      text: "Pague em até 6x sem juros",
    }, {
      icon: "idCard",
      text: "Complete seu cadastro e ganhe 20% de desconto",
    }, {
      icon: "swapArrows",
      text: "Troque em uma de nossas lojas",
    }],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit) => {
    return (
      <div
        class={`flex gap-4 items-center last:pr-4 lg:last:pr-0 border-right`}
      >
        <div class="flex pl-4 border-l border-l-black border-opacity-15">
          <Icon
            id={benefit.icon}
            class={"text-primary-content"}
            width={24}
            height={21}
            strokeWidth={1}
            fill="currentColor"
          />
        </div>
        <div class="flex-auto flex flex-col gap-1 lg:gap-2 lg:h-full justify-center lg:child">
          <div
            class={`text-base leading-none w-max `}
            dangerouslySetInnerHTML={{ __html: benefit.text }}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="w-full pl-4 py-3 flex flex-col gap-8 lg:gap-10 lg:py-7 lg:px-0 bg-white">
            <div class="w-full flex justify-center">
              <div class="flex gap-4 w-full h-[52px] overflow-x-scroll scrollbar-none lg:overflow-hidden lg:flex-wrap lg:justify-center lg:h-auto lg:gap-8 text-primary-content">
                {listOfBenefits}
              </div>
            </div>
          </div>
        )
        : ""}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:grid-flow-col lg:auto-cols-fr lg:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
