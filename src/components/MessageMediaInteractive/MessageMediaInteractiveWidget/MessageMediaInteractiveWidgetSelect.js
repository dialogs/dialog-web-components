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
    const { widget, style } = this.props;
    const className = classNames(styles.widget, styles.widgetBlock, this.props.className);

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
          wrapperClassName={styles.selectWrapper}
          name="select_default"
          id="select_default"
          size="small"
          theme={style || 'default'}
          label={widget.label || undefined}
          options={options}
          defaultValue={widget.defaultValue}
          onChange={this.props.onSubmit}
        />
      </div>
    );
  }
}

export default MessageMediaInteractiveWidgetSelect;
