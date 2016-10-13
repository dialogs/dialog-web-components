/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import styles from './ActivityInvite.css';
// import selectText from '../../utils/selectText';

export type Props = {
  className?: string,
  link: string,
  onRevoke: () => any,
};

class ActivityInvite extends Component {
  props: Props;
  handleCopyClick: Function;
  setLink: Function;
  link: HTMLElement;

  constructor(props: Props): void {
    super(props);

    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.setLink = this.setLink.bind(this);
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.link !== this.props.link ||
           nextProps.onRevoke !== this.props.onRevoke ||
           nextProps.className !== this.props.className;
  }

  handleCopyClick(): void {
    console.debug('handleCopyClick', this.props.link);
    // selectText(this.link);
  }

  setLink(element: HTMLElement): void {
    this.link = element;
  }

  render(): React.Element<any> {
    const { link } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.block}>
          <div className={styles.link} ref={this.setLink}>{link}</div>
          <Button wide theme="primary" onClick={this.handleCopyClick}>Copy Link</Button>
        </div>
        <hr className={styles.hr} />
        <div className={styles.block}>
          <a className={styles.revoke} onClick={this.props.onRevoke}>
            Revoke Invitation Link
          </a>
        </div>
      </div>
    );
  }
}

export default ActivityInvite;
