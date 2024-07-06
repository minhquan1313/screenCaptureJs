declare module "windrag" {
  interface IWinDragOptions {
    limitMovement?: boolean;
    position?: "relative" | "absolute" | "fixed";
    css?: string;
    idLength?: number;
  }

  function create(
    first: string,
    second: string,
    options?: IWinDragOptions,
  ): {
    id: number;
  };

  function hide(id: ReturnType<typeof create>["id"]): void;
  function maximize(id: ReturnType<typeof create>["id"]): void;

  const windrag = {
    create,
    hide,
    maximize,
  };
  export default windrag;
}
