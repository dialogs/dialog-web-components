/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfo } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import { AutoSizer, List } from 'react-virtualized';
import SidebarCallItem from '../SidebarCallItem/SidebarCallItem';
import styles from './SidebarCalls.css';

export type Props = {
  className?: string,
  pending: boolean,
  uid: number,
  calls: CallInfo[],
  onLoadMore: () => void,
  onSelect: (call: CallInfo) => void
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
      <Text id="SidebarCalls.empty" className={styles.empty} />
    );
  };

  renderRow = ({ index, key, style }: Object) => {
    return (
      <div key={key} style={style}>
        <SidebarCallItem
          uid={this.props.uid}
          call={this.props.calls[index]}
          onSelect={this.props.onSelect}
        />
      </div>
    );
  };

  render(): ?React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    if (this.props.pending && !this.props.calls.length) {
      return null;
    }

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
