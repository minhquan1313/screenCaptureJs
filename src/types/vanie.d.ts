declare module "vanie" {
  export type TVanieWindowType = "windows-claro" | "windows-oscuro" | "mac-claro" | "mac-oscuro" | "linux-claro" | "linux-oscuro";

  export type TVanieJustifyCss = "start" | "center" | "end" | "space-evenly" | "space-between" | "space-around";

  export type TVanieInnerHTML = string | HTMLElement | HTMLElement[];

  export type TVanieSnapDirection = "der" | "izq";

  export type TVanieMediaEvent = {
    estado: boolean;
    lado: TVanieSnapDirection;
  };

  // "arrastre" | "registro" | "pulsar" | "colision" | "vista" |
  export interface TEventPayloadMap {
    abrir: never;
    minimizar: never;
    maximizar: never;
    cerrar: never;
    media: TVanieMediaEvent;
  }

  export type TVaniePositionCoordinate = number | "top" | "bottom" | "right" | "left" | "end" | "start" | "center";
  export type TVaniePosition = {
    x: TVaniePositionCoordinate;
    y: TVaniePositionCoordinate;
  };

  export type TVanieDimensionValue = number | `${number}%`;
  export type TVanieDimension = {
    w: TVanieDimensionValue;
    h: TVanieDimensionValue;
  };
  export type TVanieDimensionGet = {
    w: number;
    h: number;
  };

  class Vanie {
    constructor(estilo: TVanieWindowType, identificador?: unknown);
    /**
     *
     */
    eliminar(): void;
    // ============================================================================================================
    /**
     * Attach parent element
     */
    asignarPadre(parent: HTMLElement): void;
    /**
     * Attach parent element
     */
    set padre(parent: HTMLElement): void;
    /**
     * Get parent element
     */
    get padre(): HTMLElement;
    /**
     * // Detach parent element
     */
    removerPadre(): void;
    // ============================================================================================================
    /**
     * Start showing to DOM
     */
    abrir(): void;
    // ============================================================================================================
    /**
     * Add Vanie event handler
     */
    addEventListener<T extends keyof TEventPayloadMap>(
      event: T,
      eventHandler: TEventPayloadMap[T] extends never ? () => void : (e: TEventPayloadMap[T]) => void,
    ): void;
    removeEventListener<T extends keyof TEventPayloadMap>(
      event: T,
      eventHandler: TEventPayloadMap[T] extends never ? () => void : (e: TEventPayloadMap[T]) => void,
    ): void;
    /**
     * Close window
     */
    cerrar(): void;
    /**
     * Maximize window
     */
    maximizar(): void;
    /**
     * Minimize window
     */
    minimizar(): void;
    // ============================================================================================================
    /**
     * Header icon
     */
    set ico(innerHTML: TVanieInnerHTML);
    /**
     * Set innerHTML for header title
     */
    set cabecera(innerHTML: TVanieInnerHTML);
    /**
     * Set string header title
     */
    set titulo(innerHTML: string);
    /**
     * Justify header title
     */
    set justificarCabecera(type: TVanieJustifyCss);
    /**
     * Remove header title
     */
    limpiarCabecera();
    // ============================================================================================================
    /**
     * Get inside window content element
     */
    get lienzo(): HTMLElement;
    /**
     * Override window content
     */
    set lienzo(innerHTML: TVanieInnerHTML);
    /**
     * Add more column to window content
     */
    lienzoAgrega(innerHTML: TVanieInnerHTML);
    /**
     * Remove some element from window content
     */
    lienzoRemueve(...element: HTMLElement[]);
    /**
     * Load other website in window content, this is the sorted way, otherwise, we can use "set lienzo" and put an iframe inside
     */
    set cargarURL(url: string);
    /**
     * Disable interaction inside window content
     */
    bloquearLienzo(enable: boolean);
    /**
     * Disable interaction inside window content that loaded with cargarURL
     */
    bloquearIframe(enable: boolean);
    // ============================================================================================================
    /**
     * Set window position on screen when window is attached to DOM
     */
    cambiarPuntoDeApertura(x: TVaniePositionCoordinate, y: TVaniePositionCoordinate);
    /**
     * Set window position on screen when window is attached to DOM
     */
    set pApertura(position: TVaniePosition);

    /**
     * Set window position on screen when window is minimized to DOM
     */
    cambiarPuntoDeRetorno(x: TVaniePositionCoordinate, y: TVaniePositionCoordinate);
    /**
     * Set window position on screen when window is minimized to DOM
     */
    set pRetorno(position: TVaniePosition);

    /**
     * Set window position on screen
     */
    desplazar(x: TVaniePositionCoordinate, y: TVaniePositionCoordinate);
    /**
     * Set window position on screen
     */
    set posicion(value: TVaniePosition);
    /**
     * Set window position X on screen
     */
    set x(x: TVaniePositionCoordinate);
    /**
     * Set window position Y on screen
     */
    set y(y: TVaniePositionCoordinate);
    /**
     * Check position, this one automatic run, but still exist in some case if needed
     */
    verificarPosicion();
    /**
     * Get position
     */
    get posicionPadre(): TVaniePosition;
    get dimensionPadre(): unknown;
    // ============================================================================================================
    /**
     * Set window width height when window is attached to DOM
     */
    cambiarDimensionInicial(w: TVanieDimensionValue, h: TVanieDimensionValue);
    /**
     * Set window width height when window is attached to DOM
     */
    set dApertura(value: TVanieDimension);

    /**
     * Set minimum window width height
     */
    cambiarDimensionMinima(w: TVanieDimensionValue, h: TVanieDimensionValue);
    /**
     * Set minimum window width height
     */
    set dMinima(value: TVanieDimension);

    /**
     * Set fixed window width height
     */
    cambiarDimensionFija(w: TVanieDimensionValue, h: TVanieDimensionValue);
    /**
     * Set fixed window width height
     */
    set dFija(value: TVanieDimension);
    /**
     * Disabled the fixed window width height
     */
    eliminarDimensionFija();

    /**
     * Set window content width height
     */
    cambiarDimensionDelLienzo(w: TVanieDimensionValue, h: TVanieDimensionValue, immutable?: boolean);
    /**
     * Set window content width height
     */
    set dLienzo(value: TVanieDimension);
    get dLienzo(): TVanieDimensionGet;
    /**
     * Set window content width and height to be immutable or not
     */
    fijarDimensionDelLienzo(immutable: boolean);

    /**
     * Allow resize or not
     */
    redimensionar(allow: boolean);
    // ============================================================================================================
    /**
     * Set window width height
     */
    set dimension(value: TVanieDimension);
    /**
     * Set window height
     */
    set alto(height: TVanieDimensionValue);
    /**
     * Set window width
     */
    set ancho(width: TVanieDimensionValue);
    // ============================================================================================================
    /**
     * Disable window popup animation
     */
    animarApertura(disable: boolean);

    /**
     * Disable window close on close click
     *
     * If false, when close window is click,
     * window will just disappear, not complete destroyed
     */
    eliminarAlCerrar(enable: boolean);

    /**
     * der = right
     *
     * izq = left
     *
     * Snap window to right or left
     */
    media(direction: TVanieSnapDirection);
    // ============================================================================================================
    /**
     * Returns true whether the window is minimized, and false if not.
     */
    get estaMinimizado(): boolean;
    /**
     * Returns true whether the window is maximized, and false if not.
     */
    get estaMaximizado(): boolean;
  }
  export default Vanie;
}
