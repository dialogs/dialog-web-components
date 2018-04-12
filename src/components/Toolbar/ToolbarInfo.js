/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import Markdown from '../Markdown/Markdown';
import styles from './Toolbar.css';

export type Props = {
  className?: string,
  title: string,
  status: string
};

class ToolbarInfo extends PureComponent<Props> {
  render() {
    const className = classNames(styles.info, this.props.className);

    return (
      <div className={className}>
        <PeerInfoTitle
          title={this.props.title}
          className={styles.nameWrapper}
          titleClassName={styles.name}
          emojiSize={20}
        />
        <div className={styles.status}>
          <Markdown text={this.props.status} emojiSize={16} inline />
        </div>
      </div>
    );
  }
}

export default ToolbarInfo;
