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
  isEnabled: boolean,
  onChange: () => void
}

class ActivityNotification extends Component {
  props: ActivityNotificationProps;
  handleChange: EventHandler;

  constructor(props: ActivityNotificationProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps: ActivityNotificationProps) {
    return nextProps.isEnabled !== this.props.isEnabled ||
           nextProps.className !== this.props.className;
  }

  handleChange(event: SyntheticEvent) {
    event.preventDefault();
    this.props.onChange(event);
  }

  render() {
    const { isEnabled } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <ActivityListItem className={className} onClick={this.handleChange}>
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
          value={isEnabled}
          className={styles.switcher}
          onChange={this.handleChange}
        />
      </ActivityListItem>
    );
  }
}

export default ActivityNotification;
