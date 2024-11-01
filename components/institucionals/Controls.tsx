import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { ComponentChildren } from "preact";

export interface Props {
  children: ComponentChildren;
}

export default function Controls(
  { children }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      class="md:hidden"
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-[100vw]">
            <div class="flex bg-base-300 items-center justify-between py-2 px-4">
              <h2 class="md:hidden text-base font-bold text-primary-content">
                Menu institucional
              </h2>
              <Button
                class="shadow-none border-0 bg-transparent"
                onClick={() => open.value = false}
              >
                <Icon
                  id="XMark"
                  class="text-primary"
                  size={15}
                  strokeWidth={1}
                />
              </Button>
            </div>
            {children}
          </div>
        </>
      }
    >
      <div class="flex">
        <Button
          class={"md:hidden bg-transparent w-full justify-between h-full px-0 py-6 text-base font-bold text-primary-content"}
          onClick={() => {
            open.value = true;
          }}
        >
          Menu institucional
          <Icon
            id="ArrowInstitucional"
            class="text-primary"
            width={11}
            height={10}
            strokeWidth={1}
          />
        </Button>
      </div>
    </Drawer>
  );
}
