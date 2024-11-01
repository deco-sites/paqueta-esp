interface Props {
  description?: string;
}

export default function ProductDescription({ description }: Props) {
  const tableInfo = description?.split("</h3>")[1];
  const descriptionProduct = description?.split("<h3")[0];
  return (
    <>
      <div class={`flex flex-col gap-4 text-primary-content`}>
        <div class="collapse collapse-arrow border border-black border-opacity-15 rounded-xl">
          <input type="checkbox" checked />
          <div class="collapse-title text-base font-medium">
            {tableInfo && tableInfo?.length > 0
              ? <>Descrição do produto</>
              : <>Informações gerais</>}
          </div>
          <div
            class="collapse-content"
            dangerouslySetInnerHTML={{ __html: descriptionProduct || "" }}
          />
        </div>
        {tableInfo && tableInfo?.length > 0 &&
          (
            <div class="collapse collapse-arrow border border-black border-opacity-15 rounded-xl">
              <input type="checkbox" />
              <div class="collapse-title text-base font-medium">
                Informações gerais
              </div>
              <div
                class="collapse-content paddingLeftUnset"
                dangerouslySetInnerHTML={{ __html: tableInfo || "" }}
              />
            </div>
          )}
      </div>
    </>
  );
}
