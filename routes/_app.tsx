import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "$store/sections/Theme/Theme.tsx";
import { Context } from "deco/deco.ts";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  const newCanonical = ctx.url.origin + ctx.url.pathname

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />
        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Canonical */}
        <link rel="canonical" href={newCanonical}></link>

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <script
          defer
          type="text/javascript"
          id="getSelo"
          src="https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?78316"
        />

        <style type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              `@supports not(color: oklch(0 0 0)) {
              :root {
                    color-scheme: light;
                  --fallback-p: #e30613;
                  --fallback-pc: #1e1e1e;
                  --fallback-s: #ffed00;
                  --fallback-sc: #fffbc2;
                  --fallback-a: #21c05e;
                  --fallback-ac: #00100d;
                  --fallback-n: #f9f9f9;
                  --fallback-nc: #f9f9f9;
                  --fallback-b1: #ffffff;
                  --fallback-b2: #ffffff;
                  --fallback-b3: #f7f7f7;
                  --fallback-bc: #f1d9d9;
                  --fallback-in: #00b3f0;
                  --fallback-inc: #000000;
                  --fallback-su: #00ca92;
                  --fallback-suc: #000000;
                  --fallback-wa: #e08e00;
                  --fallback-wac: #000000;
                  --fallback-er: #ff6f70;
                  --fallback-erc: #000000;
                }`
          }}
        >

        </style>

        {/* Dados estruturados de organização */ }
        <script  type="application/ld+json" 
        dangerouslySetInnerHTML={{__html: `
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Gaston",
              "url": "https://www.gaston.com.br/",
              "logo": "https://www.gaston.com.br/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fozksgdmyrqcxcwhnbepg.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fassets%2F4467%2Ff847281f-6762-4fb7-b3e0-ce2cb08416d4&fit=cover&width=234&height=60",
              "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+55 (11) 5039-9748",
                  "contactType": "Suporte ao Cliente",
                  "areaServed": "BR",
                  "availableLanguage": ["Portuguese"]
              },
              "sameAs": [
                  "https://www.facebook.com/GastonCalcados",
                  "https://www.instagram.com/lojasgaston/"
              ]
            }
        `}}/>
        {/* Dados estruturados de busca */ }
        {ctx.url.href === ctx.url.origin+"/" &&
          <script  type="application/ld+json" 
              dangerouslySetInnerHTML={{__html: `
              {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "url": "https://www.gaston.com.br",
                  "potentialAction": {
                      "@type": "SearchAction",
                      "target": "https://www.gaston.com.br/s?q={search_term_string}",
                      "query-input": "required name=search_term_string"
                  }
              }
          `}}/>
        }
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* <!-- Google tag (gtag.js) -->  */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16713066852">
      </script>
      <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16713066852');`}}>  </script>

      {/* Include service worker */ }
          < script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
