import { FreshContext } from "$fresh/server.ts";

export async function handler(
    req: Request,
    ctx: FreshContext<xpto>,
) {

    const resp = await ctx.next();

    if (req.headers.get("upgrade") === "websocket") {
        return resp;
    }

    action(resp);

    return resp;
}

// Funções auxiliares (exemplos)
function action(response: Response) {
    // Modifica a resposta de alguma forma
    response.headers.set("Strict-Transport-Security", "max-age=604800; includeSubDomains; preload");
}
