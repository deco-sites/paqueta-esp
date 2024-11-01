import { useSignalEffect } from "@preact/signals";
import { ComponentChildren } from "preact"
import { useUI } from "site/sdk/useUI.ts";

export interface Props {
    children: ComponentChildren;
    action?: () => void;
    class?: string;
    time?: number
}


export function Container({ children }: Props) {
    const { modalCookies } = useUI()

    useSignalEffect(() => {

        function getCookies() {
            const nameCookies = "GastonCookies"
            const cookies = document.cookie.split(";")
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();

                if (cookie.indexOf(nameCookies) === 0) {
                    return cookie.substring(nameCookies.length + 1, cookie.length); // Retorna o valor do cookie
                }
            }
        }


        const session = window.sessionStorage.getItem("cookies")
        const returnCookies = getCookies()

        console.log("cookies", session != "Reject", returnCookies)

        if (session == "Reject" || returnCookies == "true") {
            modalCookies.value = false
            console.log("state", modalCookies.value)

        } else {
            modalCookies.value = true
            console.log("state", modalCookies.value)
        }
    })

    if (!modalCookies.value) {
        return null
    }

    return (
        <div
            class="fixed bottom-9 left-0 right-0 w-full max-w-[500px] mx-auto  px-2 z-[9999999999] "
        >
            {children}
        </div>
    )
}

export function Button({ children, class: _class }: Props) {

    const { modalCookies } = useUI()

    function Reject() {
        console.log("click")
        window.sessionStorage.setItem("cookies", "Reject")
        modalCookies.value = false;
        console.log("cookies", window.sessionStorage.getItem("cookies"))
    }

    return (
        <button class={_class} onClick={Reject}>
            {children}
        </button>
    )
}

export function ButtonConfirm({ children, class: _class, time }: Props) {

    const { modalCookies } = useUI()

    function setCookie(diasExpiracao = 10) {
        console.log("click")
        let data = new Date();
        data.setTime(data.getTime() + (diasExpiracao * 24 * 60 * 60 * 1000)); // Convertendo dias para milissegundos
        let expiracao = "expires=" + data.toUTCString();
        document.cookie = "GastonCookies" + "=" + "true" + ";" + expiracao + ";path=/";
        console.log("cookies", document.cookie);
        modalCookies.value = false;
    }

    return (
        <button class={_class} onClick={() => setCookie(time)}>
            {children}
        </button>
    )
}
