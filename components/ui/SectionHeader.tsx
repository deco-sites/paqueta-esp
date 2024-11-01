import { clx } from "$store/sdk/clx.ts";

export interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
  markupTitle?: boolean;
}

const fontSizeClasses = {
  "Small": "lg:text-2xl",
  "Normal": "lg:text-3xl",
  "Large": "lg:text-4xl",
};

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 px-4 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h2
                  class={clx(
                    "text-xl lg:w-max mx-auto italic font-bold leading-6 lg:leading-none",
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-base-content",
                    props.markupTitle
                      ? "bg-primary text-white px-2.5 py-2"
                      : "text-primary-content",
                    fontSizeClasses[props.fontSize || "Normal"],
                  )}
                >
                  {props.title}
                </h2>
              )}
            {props.description &&
              (
                <p
                  class={clx(
                    "leading-[18px] italic text-base lg:max-w-[1170px] lg:mx-auto font-normal lg:leading-8",
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-primary-content",
                  )}
                >
                  {props.description}
                </p>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
