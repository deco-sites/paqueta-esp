import BackToTop from "$store/components/footer/BackToTop.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Logo from "$store/components/footer/Logo.tsx";
import MobileApps from "$store/components/footer/MobileApps.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import RegionSelector from "$store/components/footer/RegionSelector.tsx";
import Social from "$store/components/footer/Social.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import { clx } from "$store/sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import Image from "apps/website/components/Image.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
  | "Facebook"
  | "Instagram"
  | "Central";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface NewsletterForm {
  placeholderEmail?: string;
  placeholderNome?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
  | "Primary"
  | "Secondary"
  | "Accent"
  | "Base 100"
  | "Base 100 inverted";
  variation?:
  | "Variation 1"
  | "Variation 2"
  | "Variation 3"
  | "Variation 4"
  | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

interface logosSeguranca {
  image: ImageWidget;
  alt?: string;
  href?: string;
}
export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: HTMLWidget;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  grupo: {
    textFooter: HTMLWidget;
    imageGrupo: ImageWidget;
    alt?: string;
  };
  cnpjText: string;
  logos: logosSeguranca[];
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

const LAYOUT = {
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: {
      placeholderEmail: "",
      placeholderNome: "",
      buttonText: "",
      helpText: "",
    },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  grupo,
  cnpjText,
  logos,
  extraLinks = [],
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={layout?.variation == "Variation 3"} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;
  const _links = layout?.hide?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks} />;

  return (
    <footer
      class={clx(
        "w-full flex flex-col pt-10 pb-2 md:pb-10 gap-10",
        LAYOUT[layout?.backgroundColor ?? "Primary"],
      )}
    >
      <div class="w-11/12 max-w-[1300px] mx-auto">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              {_logo}
              {_sectionLinks}
              {_newsletter}
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
              {_payments}
              {_social}
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
                {_social}
                {_payments}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_newsletter}
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                {_newsletter}
                <div class="flex flex-col gap-10">
                  {_payments}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-6">
            {_newsletter}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-0 lg:divide-x">
              <div
                class={`flex flex-col items-center justify-center lg:max-w-[265px] lg:pr-10`}
              >
                {_logo}
                {_social}
              </div>
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                {_payments}
              </div>
            </div>
            <Divider />
            <div class={`flex flex-col gap-5 lg:flex-row`}>
              <div
                class={`text-xs text-primary-content `}
                dangerouslySetInnerHTML={{ __html: grupo.textFooter }}
              />
              <div
                class={`flex max-w-[340px] items-center justify-center gap-2 bg-[#F7F7F7] py-1.5 px-4 rounded-lg lg:w-full`}
              >
                <div class={`text-sm text-primary-content font-normal`}>
                  UMA EMPRESA INTEGRANTE
                </div>
                <Image
                  loading="lazy"
                  src={grupo?.imageGrupo}
                  alt={grupo?.alt}
                  width={103}
                  height={44}
                />
              </div>
            </div>
            <Divider />
            <div class={`flex flex-col gap-4 lg:flex-row`}>
              <div
                class={`text-sm text-primary-content `}
                dangerouslySetInnerHTML={{ __html: cnpjText }}
              />
              <div class={`flex gap-4`}>
                {logos.map((item) => {
                  return (
                    <a href={item.href}>
                      <Image
                        loading="lazy"
                        src={item?.image}
                        alt={item?.alt}
                        width={66}
                      />
                    </a>
                  );
                })}
                <a id="seloEbit" class={`w-12`} href="http://www.ebit.com.br/78316" target="_blank" data-noop="redir(this.href);"> </a>
                <div id="tf-seal-container" data-uuid="2de27ed3-a8bb-451d-9897-c38458fa975d">
                  <a id="tf-seal-container-link" target="_blank">
                    <div id="tf-seal-area-container" style="transform: scale(0.5) translate(-50%, -50%);margin: 10px 0;">
                    </div>
                  </a>
                  <script type="application/javascript" src="https://storage.googleapis.com/send4-stamp/production/bundle.js"></script>
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row lg:justify-start gap-4 lg:gap-0 md:items-center">
              <a
                href="https://vtex.com/br-pt"
                target={"_blank"}
                class={`flex gap-2 tems-center pr-5 justify-start text-primary-content`}
              >
                Tecnologia de e-commerce
                <img
                  loading="lazy"
                  src="/image/logo-vtex.png"
                  alt={"Logo Vtex"}
                  width={83}
                  height={30}
                />
              </a>
              <a
                href="https://www.tec4udigital.com/"
                target={"_blank"}
                class={`flex gap-2 h-[18px] lg:px-5 lg:border-l lg:border-black lg:border-opacity-15 items-center justify-start text-primary-content`}
              >
                Desenvolvido por
                <img
                  loading="lazy"
                  src="/image/logo-tec.png"
                  alt={"Logo Vtex"}
                  width={88}
                  height={18}
                />
              </a>
              <div
                class={`flex gap-2 items-center lg:pl-5 lg:border-l lg:border-black lg:border-opacity-15 justify-start text-primary-content`}
              >
                Powered by <PoweredByDeco color="Black" />
              </div>
            </div>
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {_payments}
                {_social}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              <PoweredByDeco />
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
              </div>
            </div>
          </div>
        )}
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
      <script type="text/javascript" id="" src={"https://idash.ifctech.com.br/api/chat-bot-views/bot/66aa89036e6d9bd3b27d25b8"}></script>
      <script dangerouslySetInnerHTML={{
        __html:
          `(function (e, t, o, n, p, r, i) { e.visitorGlobalObjectAlias = n; e[e.visitorGlobalObjectAlias] = e[e.visitorGlobalObjectAlias] || function () { (e[e.visitorGlobalObjectAlias].q = e[e.visitorGlobalObjectAlias].q || []).push(arguments) }; e[e.visitorGlobalObjectAlias].l = (new Date).getTime(); r = t.createElement("script"); r.src = o; r.async = true; i = t.getElementsByTagName("script")[0]; i.parentNode.insertBefore(r, i) })(window, document, "https://diffuser-cdn.app-us1.com/diffuser/diffuser.js", "vgo");
        vgo('setAccount', '612816256');
      vgo('setTrackByDefault', true);

      vgo('process');`
      }}>
      </script>
    </footer >
  );
}

export default Footer;
