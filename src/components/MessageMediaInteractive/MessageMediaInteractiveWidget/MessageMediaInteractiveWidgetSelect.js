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
import Select from '../../Select/Select';
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
    const { widget } = this.props;
    const className = classNames(styles.widget, this.props.className);

    const options = widget.options.map((option) => {
      return {
        value: option.value,
        title: option.label
      };
    });

    return (
      <div className={className}>
        <Select
          className={styles.select}
          name="select_default"
          id="select_default"
          size="small"
          options={options}
          defaultValue={widget.defaultValue}
          onChange={this.props.onSubmit}
        />
      </div>
    );
  }
}

export default MessageMediaInteractiveWidgetSelect;
