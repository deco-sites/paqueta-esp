import { HTMLWidget } from "apps/admin/widgets.ts";
import TitleContent from "./TitleContent.tsx";
import ContainerContent from "$store/components/institucionals/ContainerContent.tsx";

export interface Props {
  title: string;
  text: HTMLWidget;
}

export default function RichText({ title, text }: Props) {
  return (
    <ContainerContent>
      <TitleContent title={title} />
      <div
        class={`text-base md:text-lg flex flex-col gap-4 leading-[22.5px] font-medium text-black text-opacity-60`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </ContainerContent>
  );
}
