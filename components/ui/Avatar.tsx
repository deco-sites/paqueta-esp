/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "text-primary-content bg-base-100 ring-2 ring-primary",
  "disabled":
    "line-through text-primary-content opacity-50 pointer-events-none",
  "default": "text-primary-content bg-base-100 rounded-full",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "text-primary-content bg-base-100 ring-2 ring-primary",
  disabled: "line-through text-primary-content opacity-50 pointer-events-none",
  default: "text-primary-content",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder text-sm font-light h-12 py-1">
      <div
        class={`h-10 w-10 border border-black border-opacity-10 rounded-full ${
          colors[content] ?? colors[variant]
        } ${variants[variant]}`}
      >
        <span class="uppercase ">
          {colors[content] ? "" : content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
