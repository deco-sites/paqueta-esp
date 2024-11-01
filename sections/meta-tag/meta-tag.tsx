import { Head } from "$fresh/runtime.ts";

export interface Props {
  id: string;
}

export default function GoogleVerification({ id }: Props) {
  return (
    <Head>
      <meta name="google-site-verification" content={id} />
    </Head>
  );
}
