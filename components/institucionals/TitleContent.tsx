interface Props {
  title: string;
}

export default function TitleContent({ title }: Props) {
  return (
    <h1
      class={`px-2.5 w-max py-2 bg-primary text-xl md:text-2xl leading-7 italic font-bold text-base-100`}
    >
      {title}
    </h1>
  );
}
