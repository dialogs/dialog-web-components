/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaInteractiveWidget as MessageMediaInteractiveWidgetType, MessageMediaInteractiveStyle } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Button from '../../Button/Button';
import Select from '../../Select/Select';
import styles from './MessageMediaInteractiveWidget.css';

export type Props = {
  className?: string,
  style: MessageMediaInteractiveStyle,
  label: string,
  value: string
};

class MessageMediaInteractiveWidgetButton extends PureComponent {
  props: Props;

  handleClick = () => {
    console.debug('Button click');
  };

  render() {
    const className = classNames(styles.widget, this.props.className);

    return (
      <div className={className}>
        <Button
          theme={this.props.style}
          className={styles.button}
          view="outline"
          size="small"
          onClick={this.handleClick}
        >
          {this.props.label}
        </Button>
      </div>
    );
  }
}

export default MessageMediaInteractiveWidgetButton;
