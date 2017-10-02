/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ActivityList from '../ActivityList/ActivityList';
import ActivityMediaItem from './ActivityMediaItem';
import styles from './ActivityMedia.css';

export type Props = {
  className?: string,
  collection: Message[],
  onMediaClick: (message: Message) => mixed
};

class ActivityMedia extends PureComponent {
  props: Props;

  renderCollection() {
    const { collection } = this.props;

    if (!collection.length) {
      // TODO: Render empty list message
      return null;
    }

    return collection.map((message) => {
      return (
        <ActivityMediaItem
          key={message.rid}
          message={message}
          onClick={this.props.onMediaClick}
        />
      );
    });
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <ActivityList className={className}>
        {this.renderCollection()}
      </ActivityList>
    );
  }
}

export default ActivityMedia;
