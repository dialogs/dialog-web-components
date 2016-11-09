/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message as MessageType } from '@dlghq/dialog-types';
import type {
  RowsRenderedEvent,
  SizeEvent,
  RowRenderRequest,
  CellRenderRequest,
  CellRenderContext
} from 'react-virtualized';

import React, { PureComponent } from 'react';
import { AutoSizer, CellMeasurer, List } from 'react-virtualized';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import styles from './MessageList.css';

// const originalMeasureCell = CellMeasurer.prototype._measureCell;
// CellMeasurer.prototype._measureCell = function (request) {
//   const label = `measure cell #${request.rowIndex}`;
//   console.profile(label);
//   const result = originalMeasureCell.call(this, request);
//   console.profileEnd(label);
//
//   return result;
// };

export type Props = {
  className?: string,
  messages: MessageType[]
};

export type State = {
  scrollTo: number
};

class MessageList extends PureComponent {
  props: Props;
  state: State;

  // refs
  list: ?List;
  measurer: ?CellMeasurer;

  // render context
  width: number;

  constructor(props: Props) {
    super(props);

    this.width = 0;

    this.state = {
      scrollTo: 0
    };
  }

  handleRowsRendered = ({ startIndex, stopIndex }: RowsRenderedEvent): void => {
    console.debug({ startIndex, stopIndex });
  };

  handleResize = ({ width }: SizeEvent): void => {
    if (this.width !== 0 && this.width !== width) {
      if (this.measurer) {
        this.measurer.resetMeasurements();
      }

      if (this.list) {
        this.list.recomputeRowHeights();
      }
    }

    this.width = width;
  };

  renderEmpty = (): React.Element<any> => {
    return (
      <Spinner />
    );
  };

  renderRow = ({ key, index, style }: RowRenderRequest): React.Element<any> => {
    const message = this.props.messages[index];

    return (
      <div key={key} style={style}>
        <Message
          short={false}
          message={message}
        />
      </div>
    );
  };

  renderCell = ({ rowIndex }: CellRenderRequest): React.Element<any> => {
    const message = this.props.messages[rowIndex];

    return (
      <Message
        fake
        short={false}
        message={message}
      />
    );
  };

  setList = (list: List): void => {
    this.list = list;
  };

  setMeasurer = (measurer: CellMeasurer): void => {
    this.measurer = measurer;
  };

  render() {
    const className = classNames(styles.list, this.props.className);
    const rowCount = this.props.messages.length;

    return (
      <div className={styles.container}>
        <AutoSizer onResize={this.handleResize}>
          {({ width, height }: SizeEvent) => {
            return (
              <CellMeasurer
                ref={this.setMeasurer}
                columnCount={1}
                width={width}
                rowCount={rowCount}
                cellRenderer={this.renderCell}
              >
                {({ getRowHeight }: CellRenderContext) => {
                  return (
                    <List
                      ref={this.setList}
                      className={className}
                      width={width}
                      height={height}
                      overscanRowCount={10}
                      scrollToIndex={this.state.scrollTo}
                      rowCount={rowCount}
                      rowHeight={getRowHeight}
                      rowRenderer={this.renderRow}
                      noRowsRenderer={this.renderEmpty}
                      onRowsRendered={this.handleRowsRendered}
                    />
                  );
                }}
              </CellMeasurer>
            );
          }}
        </AutoSizer>
      </div>
    );
  }
}

export default MessageList;
