/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ActivityListItem from '../ActivityListItem/ActivityListItem';
import Icon from '../Icon/Icon';
import Switcher from '../Switcher/Switcher';
import styles from './ActivityNotification.css';

export type ActivityNotificationProps = {
  className?: string,
  value: boolean,
  onChange: (value: boolean) => void
}

class ActivityNotification extends Component {
  props: ActivityNotificationProps;
  handleClick: EventHandler;

  constructor(props: ActivityNotificationProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps: ActivityNotificationProps): boolean {
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
        />
        <Text
          tagName="div"
          id="ActivityNotification.notifications"
          className={styles.text}
        />
        <Switcher
          id="activity_notification"
          value={this.props.value}
          className={styles.switcher}
          onChange={this.props.onChange}
        />
      </ActivityListItem>
    );
  }
}

export default ActivityNotification;
