/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

declare module 'photoSwipe' {
  declare type PhotoSwipeItem = {
    src: string,
    w: number,
    h: number
  };

  declare type PhotoSwipeOptions = {
    index?: number,
    getThumbBoundsFn?: (index: number) => { x: number, y: number, width: number },
    showHideOpacity?: boolean,
    showAnimationDuration?: number,
    hideAnimationDuration?: number,
    bgOpacity?: number,
    spacing?: number,
    allowPanToNext?: boolean,
    maxSpreadZoom?: number,
    getDoubleTapZoom?: (isMouseClick: boolean, item: PhotoSwipeItem) => number,
    loop?: boolean,
    pinchToClose?: boolean,
    closeOnScroll?: boolean,
    closeOnVerticalDrag?: boolean,
    mouseUsed?: boolean,
    escKey?: boolean,
    arrowKeys?: boolean,
    history?: boolean,
    galleryUID?: number,
    galleryPIDs?: boolean,
    errorMsg?: string,
    preload?: [number, number],
    mainClass?: string,
    getNumItemsFn?: () => number,
    focus?: boolean,
    isClickableElement?: (element: HTMLElement) => boolean,
    modal?: boolean
  };

  declare type Point = {
    x: number,
    y: number
  };

  declare class PhotoSwipeUI {

  }

  declare class PhotoSwipe {
    currItem: PhotoSwipeItem;
    items: PhotoSwipeItem[];
    viewportSize: number;
    framework: Object;
    ui: PhotoSwipeUI;
    bg: HTMLElement;
    container: HTMLElement;
    options: PhotoSwipeOptions;

    constructor(element: HTMLElement,
                ui: PhotoSwipeUI | false,
                items: PhotoSwipeItem[],
                options: PhotoSwipeOptions): void;

    // setters
    init(): void;
    goTo(index: number): void;
    next(): void;
    prev(): void;
    updateSize(force: boolean): void;
    close(): void;
    destroy(): void;
    zoomTo(level: number, center: Point, speed: number, easing?: Function, update?: Function): void;
    applyZoomPan(zoomLevel: number, panX: number, panY: number): void;

    // getters
    getCurrentIndex(): number;
    getZoomLevel(): number;
    isDragging(): boolean;
    isZooming(): boolean;
    isMainScrollAnimating(): boolean;

    // events
    listen(event: 'beforeChange', listener: () => void): void;
    listen(event: 'afterChange', listener: () => void): void;
    listen(event: 'imageLoadComplete', listener: (index: number, item: PhotoSwipeItem) => void): void;
    listen(event: 'resize', listener: () => void): void;
    listen(event: 'gettingData', listener: (index: number, item: PhotoSwipeItem) => void): void;
    listen(event: 'mouseUsed', listener: () => void): void;
    listen(event: 'initialZoomIn', listener: () => void): void;
    listen(event: 'initialZoomInEnd', listener: () => void): void;
    listen(event: 'initialZoomOut', listener: () => void): void;
    listen(event: 'initialZoomOutEnd', listener: () => void): void;
    listen(event: 'parseVerticalMargin', listener: (item: PhotoSwipeItem) => void): void;
    listen(event: 'close', listener: () => void): void;
    listen(event: 'unbindEvents', listener: () => void): void;
    listen(event: 'destroy', listener: () => void): void;
    listen(event: 'updateScrollOffset', listener: (offset: Point) => void): void;
  }

  declare var exports: typeof PhotoSwipe;
}
