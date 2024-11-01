import { Section } from "deco/blocks/section.ts";

interface Sections {
  section: Section;
}

export interface Props {
  /** @maxItems 2 */
  sections: Sections[];
}

export default function LayoutInstitucional({ sections }: Props) {
  return (
    <div class={`w-full lg:py-16 bg-base-300`}>
      <div
        class={`flex flex-col w-11/12 max-w-[1300px] mx-auto md:grid md:grid-cols-[26.3%73.7%] md:justify-between `}
      >
        {sections.map((sections) => {
          return <sections.section.Component {...sections.section.props} />;
        })}
      </div>
    </div>
  );
}
