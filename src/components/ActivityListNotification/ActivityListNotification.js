/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ActivityListItem from '../ActivityList/ActivityListItem';
import Icon from '../Icon/Icon';
import Switcher from '../Switcher/Switcher';
import styles from './ActivityListNotification.css';

export type Props = {
  className?: string,
  value: boolean,
  onChange: (value: boolean) => void
}

class ActivityListNotification extends Component {
  props: Props;
  handleClick: Function;

  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.value !== this.props.value ||
           nextProps.className !== this.props.className;
  }

  handleClick(event: SyntheticEvent): void {
    event.preventDefault();
    this.props.onChange(!this.props.value);
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <ActivityListItem className={className} onClick={this.handleClick}>
        <Icon
          glyph="notifications"
          inverted
          theme="danger"
          className={styles.icon}
          size={28}
        />
        <Text
          tagName="div"
          id="ActivityListNotification.notifications"
          className={styles.text}
        />
        <Switcher
          id="activity_notification"
          name="activity_notification"
          value={this.props.value}
          className={styles.switcher}
          onChange={this.props.onChange}
        />
      </ActivityListItem>
    );
  }
}

export default ActivityListNotification;
