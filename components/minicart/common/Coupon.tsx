import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  return (
    <div class="flex flex-col gap-2 justify-between items-start px-4">
      <span class="text-xs font-semibold text-black opacity-60 uppercase">
        Adicionar cupom
      </span>
      <form
        class="join justify-between w-full gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const { currentTarget: { elements } } = e;

          const input = elements.namedItem("coupon") as HTMLInputElement;
          const text = input.value;

          if (!text) return;

          try {
            setLoading(true);
            await onAddCoupon(text);
            setDisplay(false);
          } finally {
            setLoading(false);
          }
        }}
      >
        <input
          name="coupon"
          class="border border-gray-300 text-primary-content rounded-[500px] w-full pl-4"
          type="text"
          value={coupon ?? ""}
          placeholder={"Cupom"}
        />
        <Button
          class="bg-black px-4 py-3 rounded-[500px] h-10 min-h-[41px]"
          type="submit"
          htmlFor="coupon"
          loading={loading}
        >
          <Icon
            id="arrowRight"
            width={18}
            height={17}
            strokeWidth={1}
            class="text-white"
          />
        </Button>
      </form>
    </div>
  );
}

export default Coupon;
