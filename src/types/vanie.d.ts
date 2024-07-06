declare module "vanie" {
  export type TVanieWindowType = "mac-oscuro" | "linux-oscuro" | "windows-claro";

  class Vanie {
    constructor(estilo: TVanieWindowType, identificador?: unknown);
    eliminar();
    removerPadre();
    asignarPadre(padre);

    get padre(): unknown;
    set padre(ele: unknown);
  }
  export default Vanie;
}
