import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-3 py-3">
      {methods.map((method) => (
        <li class="flex justify-between items-center border-base-200 not-first-child:border-t">
          <span class="text-xs lg:text-sm min-w-[130px] max-w-[130px] lg:min-w-[220px] lg:max-w-[220px]">
            {method.pickupStoreInfo.friendlyName || method.name}
          </span>
          {method.deliveryChannel == "pickup-in-point" &&
              method.shippingEstimate == "0bd"
            ? (
              <>
                <span class="text-xs lg:text-sm min-w-[110px]">
                  Retire no mesmo dia
                </span>
              </>
            )
            : (
              <>
                <span class="text-xs lg:text-sm min-w-[110px]">
                  até {formatShippingEstimate(method.shippingEstimate)}
                </span>
              </>
            )}
          <span class="text-sm text-primary font-semibold min-w-[60px]">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async (e: Event) => {
    e.preventDefault(); // Prevenir o comportamento padrão do formulário

    if (postalCode.value.length !== 9) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value.replace("-", ""),
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
      console.log(simulateResult);
    }
  }, [postalCode, simulateResult, simulate, items, cart, loading]);

  return (
    <div class="collapse collapse-arrow text-primary-content border border-black border-opacity-10 rounded-lg">
      <input type="checkbox" class={`h-[50px] min-h-[50px]`} />
      <div class="collapse-title min-h-[50px] flex gap-3">
        <Icon
          id="TruckFast"
          width="20"
          height="17"
          strokeWidth={1}
          class={`text-primary`}
        />
        <span class={`text-sm font-medium text-primary-content`}>
          Confira o prazo de entrega
        </span>
      </div>
      <div class={`collapse-content flex flex-col gap-3`}>
        <form
          onSubmit={handleSimulation} // Passando a função 'handleSimulation' diretamente
          class={`relative flex`}
        >
          <input
            type="text"
            class="input input-bordered join-item rounded-[100px] bg-transparent border-black border-opacity-10 w-full"
            placeholder="Informe seu CEP"
            value={postalCode.value}
            maxLength={9} // Permitindo 9 caracteres (incluindo o traço)
            onChange={(e: { currentTarget: { value: string } }) => {
              // Limpar qualquer caractere não numérico e aplicar a máscara de CEP
              const cleanedValue = e.currentTarget.value.replace(/\D/g, "");
              const formattedValue = cleanedValue.replace(
                /^(\d{5})(\d{3})?$/,
                "$1-$2",
              );
              postalCode.value = formattedValue;
            }}
            onKeyPress={(e: KeyboardEvent) => {
              // Permitir apenas números
              const charCode = e.charCode;
              if (charCode < 48 || charCode > 57) {
                e.preventDefault();
              }
            }}
          />
          <Button
            type="submit"
            loading={loading.value}
            class="join-item absolute right-2.5 top-1.5 bg-primary rounded-full w-9 h-9 min-h-9"
          >
            OK
          </Button>
        </form>

        <div>
          <div>
            <ShippingContent simulation={simulateResult} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
