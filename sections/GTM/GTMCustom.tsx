import { Head } from "$fresh/runtime.ts";

export interface Props {
    id: string;
}

export default function GTMCustom(props: Props) {

    const { id } = props

    return (
        <Head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        document.addEventListener('DOMContentLoaded', () => {
                            setTimeout(initGTM, 7000);
                        });
                    document.addEventListener('scroll', initGTMOnEvent);
                    document.addEventListener('mousemove', initGTMOnEvent);
                    document.addEventListener('touchstart', initGTMOnEvent);
                    function initGTMOnEvent(e) {
                    initGTM();
            e.currentTarget.removeEventListener(e.type, initGTMOnEvent);
                  }
            function initGTM() {
                    if (window.gtmDidInit) {
                      return false;
                    }
            window.gtmDidInit = true;
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
                    s.onload = () => {
                dataLayer.push({ event: 'gtm.js', 'gtm.start': new Date().getTime(), 'gtm.uniqueEventId': 0 });
                    };
            s.src = 'https://www.googletagmanager.com/gtm.js?id=${id}';
            document.head.appendChild(s);
                  }
                  `
                }}
            />
        </Head >
    )
    
}