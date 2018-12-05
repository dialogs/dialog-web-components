/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  MessageMediaInteractiveStyle,
  MessageMediaInteractiveButton,
} from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Button from '../../Button/Button';
import styles from './MessageMediaInteractiveWidget.css';

export type Props = {
  className?: string,
  style?: ?MessageMediaInteractiveStyle,
  widget: MessageMediaInteractiveButton,
  onSubmit: (value: string) => mixed,
};

class MessageMediaInteractiveWidgetButton extends PureComponent<Props> {
  handleClick = () => {
    this.props.onSubmit(this.props.widget.value);
  };

  render() {
    const { style, widget } = this.props;
    const className = classNames(styles.widget, this.props.className);

    return (
      <div className={className}>
        <Button
          className={styles.button}
          theme={style || 'default'}
          size="small"
          view="outline"
          onClick={this.handleClick}
        >
          {widget.label || ''}
        </Button>
      </div>
    );
  }
}

export default MessageMediaInteractiveWidgetButton;
