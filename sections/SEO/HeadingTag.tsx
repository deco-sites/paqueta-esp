import { RichText } from "apps/admin/widgets.ts";

interface Props {
    /**
     * @title Tag Headintag
     */
    headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    /**
 * @title Texto
 */
    text?: RichText;
    /**
     * @format color-input
     * @title Cor de fundo
     * @description Padrão: "#f8f8f8"
     */
    bgText?: string;
}

function HeadingTag(props: Props) {
    const { headingTag = "h1", text = "Gaston" } = props

    switch (headingTag) {
        case "h1":
            return (
                <h1 dangerouslySetInnerHTML={{ __html: text }}>
                </h1>
            )
        case "h2":
            return (
                <h2 dangerouslySetInnerHTML={{ __html: text }}>
                </h2>
            )
        case "h3":
            return (
                <h3 dangerouslySetInnerHTML={{ __html: text }}>
                </h3>
            )
        case "h4":
            return (
                <h4 dangerouslySetInnerHTML={{ __html: text }}>
                </h4>
            )
        case "h5":
            return (
                <h5 dangerouslySetInnerHTML={{ __html: text }}>
                </h5>
            )
        case "h6":
            return (
                <h6 dangerouslySetInnerHTML={{ __html: text }}>
                </h6>
            )
        default:
            return (
                <p dangerouslySetInnerHTML={{ __html: text }}>
                </p>
            )
    }
}

export default function ContainerHeadingTag(props: Props) {

    if (props.text == null) {
        return null
    }

    return (
        <div class="w-full h-full text-center justify-center items-center text-2xl font-bold lg:text-3xl py-10 px-5"
            style={{ background: props.bgText || "#f8f8f8" }}
        >
            <HeadingTag {...props} />
        </div>
    )

}