import { Head } from "$fresh/runtime.ts";
import { useScript } from "deco/hooks/useScript.ts";

interface Script {
    /**
     * @format text-area
     */
    script?: string;
    src?: string;
    id?: string;
}

interface Props {
    //**@t */
    scripts: Script[];
    defer?: boolean;
}


function AddScript(props: Props) {

    function initScript(scripts: Script[]) {

        scripts.forEach((script) => {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = script.src || "";
            s.innerHTML = script.script || "";
            s.id = script.id || "";
            console.log("init", scripts, s)
            document.head.appendChild(s);
        })
    }

    if (props.defer) {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => { initScript(props.scripts) }, 2000);
        });
    } else {
        initScript(props.scripts)
    }
}

export default function ScriptHead(props: Props) {

    const { defer, scripts } = props

    return (
        <Head>
            {scripts.map((script) =>
                <script
                    type="module"
                    defer
                    dangerouslySetInnerHTML={{
                        __html: `
                    
    function initScript() {
        const s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = "${script.src}";
            s.innerHTML = ${script.script} ;
            s.id ="${script.id}";
            s.defer=true;
            s.async=false;
            document.head.appendChild(s);
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => { initScript() }, 7000);
        });
        `}}
                ></script>
            )}
        </Head>
    )
}