/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  MessageMediaInteractiveStyle,
  MessageMediaInteractiveSelect
} from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import SelectNext from '../../SelectNext/SelectNext';
import styles from './MessageMediaInteractiveWidget.css';

export type Props = {
  className?: string,
  style?: ?MessageMediaInteractiveStyle,
  widget: MessageMediaInteractiveSelect,
  onSubmit: (value: string) => mixed
};

class MessageMediaInteractiveWidgetSelect extends PureComponent {
  props: Props;

  render() {
    const { widget, style } = this.props;
    const className = classNames(styles.widget, this.props.className);

    const options = widget.options.map((option) => {
      return {
        value: option.value,
        title: option.label
      };
    });

    return (
      <div className={className}>
        <SelectNext
          className={styles.select}
          wrapperClassName={styles.selectWrapper}
          name="select_default"
          id="select_default"
          size="small"
          theme={style || 'default'}
          placeholder={widget.label || undefined}
          options={options}
          onChange={this.props.onSubmit}
        />
      </div>
    );
  }
}

export default MessageMediaInteractiveWidgetSelect;
