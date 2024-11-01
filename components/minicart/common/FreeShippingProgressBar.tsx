import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-center items-center gap-2 text-primary-content uppercase font-bold text-sm">
        {remaining > 0
          ? (
            <span class={`text-center`}>
              Faltam{" "}
              <strong class={`text-primary`}>
                {formatPrice(remaining, currency, locale)}
                {" "}
              </strong>{" "}
              para o <strong class={`text-primary`}>frete grátis</strong>
            </span>
          )
          : (
            <span>
              Você ganhou <strong class={`text-primary`}>frete grátis!</strong>
            </span>
          )}
      </div>
      <progress
        class="progress progress-primary w-full bg-[#EBEBEB]"
        value={percent}
        max={100}
      />
    </div>
  );
}

export default FreeShippingProgressBar;
