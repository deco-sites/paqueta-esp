import { RichText } from "apps/admin/widgets.ts";
import { Button, ButtonConfirm, Container } from "site/islands/Modal/Button.tsx";
import { useUI } from "site/sdk/useUI.ts";

interface CTAComfirm {
    /**
 * @title Texto do CTA
 */
    label: string;
    /**
 * @title  Tempo de duração
 * @description tempo de duração do cookies em dias, default: 10 dias
 */
    time: number;
}

export interface Props {
    /**
     * @title Titulo
     */
    title: string;
    /**
     * @title Descrição
     */
    content: RichText;
    /**
     * @title Confirmação
     */
    confirm: CTAComfirm;
    /**
     * @title Rejeição
     */
    reject: string;
}

export default function Cookies(props: Props) {

    const { title, content, confirm, reject } = props

    return (
        <Container>
            <div class="flex flex-col gap-4 text-black bg-base-100 py-3 px-5 rounded-lg shadow-lg">
                <h2 class="lg:text-2xl text-xl">
                    {title}
                </h2>
                <span class="text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: content }}>

                </span>
                <div class="flex justify-between items-center w-full font-bold">
                    <ButtonConfirm
                        time={confirm.time}
                        class="h-10 justify-center items-center px-3 font-semibold text-center bg-primary rounded hover:opacity-80 duration-200 cursor-pointer">
                        {confirm.label}
                    </ButtonConfirm>
                    <Button
                        class="h-10 justify-center items-center px-3 font-semibold text-center bg-[#f0f0f0] rounded hover:opacity-80 duration-200 cursor-pointer">
                        {reject}
                    </Button>
                </div>
            </div>
        </Container>
    )
}