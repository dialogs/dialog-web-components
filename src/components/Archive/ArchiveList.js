/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
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
  renderEmpty = () => {
    return (
      <span>{'You don\'t have archived chats'}</span>
    );
  };

  handleRowsRendered = ({ overscanStopIndex }) => {
    if (overscanStopIndex === this.props.items.length - 1) {
      this.props.onLoadMore();
    }
  };

  renderRow = ({ index, key, style }) => {
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
    )
  };

  render() {
    return (
      <AutoSizer>
        {({ width, height }) => {
          console.debug({ width, height, items: this.props.items });
          return (
            <List
              className={this.props.className}
              width={width}
              height={height}
              noRowsRenderer={this.renderEmpty}
              onRowsRendered={this.handleRowsRendered}
              rowHeight={46}
              rowRenderer={this.renderRow}
              rowCount={this.props.items.length}
            />
          )
        }}
      </AutoSizer>
    )
  }
}

export default ArchiveList;
