import type { ComponentChildren } from "preact";

export interface Props {
  children: ComponentChildren;
}

export default function ContainerContent({ children }: Props) {
  return (
    <div
      class={`py-6 px-4 gap-4 mb-4 md:mb-0 md:py-8 md:px-10 rounded-2xl md:gap-8 flex flex-col bg-base-100`}
    >
      {children}
    </div>
  );
}
