/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, ShortRecent } from '@dlghq/dialog-types';
import React from 'react';
import ArchiveList from './ArchiveList';
import styles from './Archive.css';

export type Props = {
  pending: boolean,
  archive: ShortRecent[],
  onLoadMore: () => void,
  onSelect: (peer: Peer) => void
};

function Archive(props: Props): React.Element<any> {
  return (
    <ArchiveList
      className={styles.container}
      items={props.archive}
      pending={props.pending}
      onLoadMore={props.onLoadMore}
      onSelect={props.onSelect}
    />
  );
}

export default Archive;
