import { invoke } from "$store/runtime.ts";
import { clx } from "$store/sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import Icon from "site/components/ui/Icon.tsx";

export interface Form {
  placeholderEmail?: string;
  placeholderNome?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col gap-4",
        tiled &&
          "lg:flex-row lg:w-full lg:justify-between text-primary-content border border-black border-opacity-[12%] rounded-3xl p-4 lg:p-10",
      )}
    >
      <div class="flex flex-col gap-4">
        {content?.title && (
          <h2 class={tiled ? "text-2xl font-bold lg:text-3xl" : "text-lg"}>
            {content?.title}
          </h2>
        )}
        {content?.description && (
          <p class={`text-sm font-normal`}>{content?.description}</p>
        )}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 justify-center lg:justify-start 2xl:flex-nowrap">
            <input
              name="name"
              class="flex-auto md:flex-none input input-bordered border-black border-opacity-[12%] rounded-3xl md:w-[311px] text-primary-content"
              placeholder={content?.form?.placeholderNome || "Name"}
            />
            <input
              name="email"
              class="flex-auto md:flex-none input input-bordered border-black border-opacity-[12%] rounded-3xl md:w-[311px] text-primary-content"
              placeholder={content?.form?.placeholderEmail ||
                "Digite seu email"}
            />
            <button
              type="submit"
              class="disabled:loading flex gap-2 justify-center items-center px-8 py-2.5 border border-primary-content rounded-[500px] text-primary-content uppercase font-bold "
              disabled={loading}
            >
              <Icon
                id="arrowRight"
                width={18}
                height={17}
                strokeWidth={1}
                class="text-primary-content"
              />
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form>
        {content?.form?.helpText && (
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  );
}

export default Newsletter;
