/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfo } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import { AutoSizer, List } from 'react-virtualized';
import SidebarCallItem from '../SidebarCallItem/SidebarCallItem';
import Dialpad from '../Dialpad/Dialpad';
import styles from './SidebarCalls.css';

export type Props = {
  className?: string,
  pending: boolean,
  uid: number,
  calls: CallInfo[],
  enableDialpad: boolean,
  number: string,
  onLoadMore: () => mixed,
  onSelect: (call: CallInfo) => mixed,
  onNumberChange: (phone: string) => mixed,
  onNumberSubmit: (phone: string) => mixed,
  onNumberFocus: () => mixed,
  onNumberBlur: () => mixed
};

class SidebarCalls extends Component<Props> {
  static defaultProps = {
    enableDialpad: false
  };

  handleRowsRendered = ({ overscanStopIndex }: Object) => {
    if (overscanStopIndex === this.props.calls.length - 1) {
      this.props.onLoadMore();
    }
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

  renderEmpty = () => {
    return (
      <div className={styles.empty}>
        <Text
          id="SidebarCalls.empty"
          html
          tagName="div"
          className={styles.emptyText}
        />
      </div>
    );
  };

  renderDialpad() {
    if (!this.props.enableDialpad) {
      return null;
    }

    return (
      <Dialpad
        className={styles.dialpad}
        number={this.props.number}
        onChange={this.props.onNumberChange}
        onSubmit={this.props.onNumberSubmit}
        onBlur={this.props.onNumberBlur}
        onFocus={this.props.onNumberFocus}
      />
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    if (this.props.pending && !this.props.calls.length) {
      return null;
    }

    return (
      <div className={className}>
        {this.renderDialpad()}
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
