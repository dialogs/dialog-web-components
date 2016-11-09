/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

declare module 'react-virtualized' {
  declare type RowsRenderedEvent = {
    overscanStartIndex: number,
    overscanStopIndex: number,
    startIndex: number,
    stopIndex: number
  };

  declare type ScrollEvent = {
    clientHeight: number,
    scrollHeight: number,
    scrollTop: number
  };

  declare type SizeRequest = {
    index: number
  };

  declare type RowRenderRequest = {
    index: number,
    key: string,
    style: Object,
    isScrolling: boolean
  };

  declare type ScrollAlignmentState = 'auto' | 'start' | 'center' | 'end';

  declare type ListDefaultProps = {
    estimatedRowSize: 30,
    noRowsRenderer: () => null,
    onRowsRendered: () => null,
    onScroll: () => null,
    overscanRowCount: 10,
    scrollToAlignment: 'auto',
    style: {}
  };

  declare type ListProps = {
    autoHeight?: boolean,
    className?: string,
    estimatedRowSize?: number,
    height: number,
    id?: string,
    noRowsRenderer(): React$Element<any>,
    onRowsRendered(event: RowsRenderedEvent): React$Element<any>,
    onScroll(event: ScrollEvent): void,
    overscanRowCount?: number,
    rowCount: number,
    rowHeight: number | (request: SizeRequest) => number,
    rowRenderer(request: RowRenderRequest): React$Element<any>,
    scrollToAlignment?: ScrollAlignmentState,
    scrollToIndex?: number,
    scrollTop?: number,
    style?: Object,
    tabIndex?: number,
    width: number
  };

  declare class List extends React$Component {
    static defaultProps: ListDefaultProps;
    props: ListProps;

    forceUpdateGrid(): void;
    measureAllRows(): void;
    recomputeRowHeights(index: number): void;
  }

  declare type SizeEvent = {
    width: number,
    height: number
  };

  declare type AutoSizerProps = {
    children?: (event: SizeEvent) => React$Element<any>,
    disableHeight?: boolean,
    disableWidth?: boolean,
    onResize?: (event: SizeEvent) => void
  };

  declare class AutoSizer extends React$Component {
    props: AutoSizerProps;
  }

  declare type CellRenderRequest = {
    columnIndex: number,
    rowIndex: number
  };

  declare type CellRenderContext = {
    getColumnWidth(index: number): number,
    getRowHeight(index: number): number,
    resetMeasurements(): void
  };


  declare type CellMeasurerProps = {
    cellRenderer: (request: CellRenderRequest) => React$Element<any>,
    cellSizeCache?: Object,
    children?: (context: CellRenderContext) => React$Element<any>,
    columnCount: number,
    container?:React$Element<any>,
    height?: number,
    rowCount: number,
    width?: number
  };

  declare class CellMeasurer extends React$Component {
    props: CellMeasurerProps;

    getColumnWidth(request: SizeRequest): number;
    getRowHeight(request: SizeRequest): number;
    resetMeasurementForColumn(columnIndex: number): void;
    resetMeasurementForRow(rowIndex: number): void;
    resetMeasurements(): void;
  }

  declare var exports: {
    List: typeof List,
    AutoSizer: typeof AutoSizer,
    CellMeasurer: typeof CellMeasurer
  };
}
