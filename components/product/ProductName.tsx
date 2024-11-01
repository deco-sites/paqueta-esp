import { useUI } from "site/sdk/useUI.ts";

export interface Props {
  name: string;
  model?: string;
  device?: "mobile" | "tablet" | "desktop";
}

export default function ProductName({ name, model, device }: Props) {
  const { productNameSimilar, productModelSimilar } = useUI();

  if (device == "desktop") {
    return (
      <>
        <div class="flex flex-col gap-4">
          {model && (
            <span class="text-sm text-primary-content">
              Ref:{" "}
              {productModelSimilar.value && productModelSimilar.value.length > 0
                ? productModelSimilar.value
                : model}
            </span>
          )}
          <h1 class={`text-2xl leading-7 font-bold text-primary-content`}>
            {productNameSimilar.value && productNameSimilar.value.length > 0
              ? productNameSimilar.value
              : name}
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div class="w-11/12 mx-auto sm:mt-8">
        <h1 class={`text-xl leading-6 font-bold text-primary-content`}>
          {productNameSimilar.value && productNameSimilar.value.length > 0
            ? productNameSimilar.value
            : name}
        </h1>
        {model && (
          <span class="text-xs text-primary-content">
            Ref:{" "}
            {productModelSimilar.value && productModelSimilar.value.length > 0
              ? productModelSimilar.value
              : model}
          </span>
        )}
      </div>
    </>
  );
}
