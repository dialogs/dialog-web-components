/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, ShortRecent } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import ArchiveList from './ArchiveList';
import styles from './Archive.css';

export type Props = {
  className?: string,
  pending: boolean,
  peer?: Peer,
  archive: ShortRecent[],
  onLoadMore: () => void,
  onSelect: (peer: Peer) => void
};

function Archive(props: Props): ?React.Element<any> {
  const className = classNames(styles.container, props.className);

  if (props.pending && !props.archive.length) {
    return null;
  }

  return (
    <ArchiveList
      className={className}
      items={props.archive}
      peer={props.peer}
      pending={props.pending}
      onLoadMore={props.onLoadMore}
      onSelect={props.onSelect}
    />
  );
}

export default Archive;
