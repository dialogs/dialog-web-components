/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfo } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { AutoSizer, List } from 'react-virtualized';
import RecentCallItem from '../RecentCallItem/RecentCallItem';
import styles from './SidebarCalls.css';

export type Props = {
  className?: string,
  pending: boolean,
  uid: number,
  calls: CallInfo[],
  onLoadMore: () => void,
  onSelect: (id: string) => void
};

class SidebarCalls extends Component {
  props: Props;

  handleRowsRendered = ({ overscanStopIndex }: Object) => {
    if (overscanStopIndex === this.props.calls.length - 1) {
      this.props.onLoadMore();
    }
  };

  renderEmpty = () => {
    return (
      <span>{'You don\'t have archived chats'}</span>
    );
  };

  renderRow = ({ index, key, style }: Object) => {
    return (
      <div key={key} style={style}>
        <RecentCallItem
          uid={this.props.uid}
          call={this.props.calls[index]}
          onSelect={this.props.onSelect}
        />
      </div>
    );
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                width={width}
                height={height}
                noRowsRenderer={this.renderEmpty}
                onRowsRendered={this.handleRowsRendered}
                rowHeight={61}
                rowRenderer={this.renderRow}
                rowCount={this.props.calls.length}
              />
            );
          }}
        </AutoSizer>
      </div>
    );
  }
}

export default SidebarCalls;
