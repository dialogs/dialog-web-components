/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, ShortRecent } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import RecentItem from '../RecentItem/RecentItem';

export type Props = {
  className?: string,
  items: ShortRecent[],
  onLoadMore: () => void,
  onSelect: (peer: Peer) => void
}

class ArchiveList extends PureComponent {
  props: Props;

  handleRowsRendered = ({ overscanStopIndex }: Object) => {
    if (overscanStopIndex === this.props.items.length - 1) {
      this.props.onLoadMore();
    }
  };

  renderEmpty = () => {
    return (
      <span>{'You don\'t have archived chats'}</span>
    );
  };

  renderRow = ({ index, key, style }: Object) => {
    const { peer, counter } = this.props.items[index];

    return (
      <div key={key} style={style}>
        <RecentItem
          info={peer}
          active={false}
          counter={counter}
          onSelect={this.props.onSelect}
        />
      </div>
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                width={width}
                height={height}
                noRowsRenderer={this.renderEmpty}
                onRowsRendered={this.handleRowsRendered}
                rowHeight={46}
                rowRenderer={this.renderRow}
                rowCount={this.props.items.length}
              />
            );
          }}
        </AutoSizer>
      </div>
    );
  }
}

export default ArchiveList;
