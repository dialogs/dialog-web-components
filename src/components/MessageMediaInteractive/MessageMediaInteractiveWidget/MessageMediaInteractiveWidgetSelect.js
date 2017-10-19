/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  MessageMediaInteractiveWidget as MessageMediaInteractiveWidgetType,
  MessageMediaInteractiveStyle
} from '@dlghq/dialog-types';
import React, {PureComponent} from 'react';
import classNames from 'classnames';
import Select from '../../Select/Select';
import styles from './MessageMediaInteractiveWidget.css';

export type Props = {
  className?: string,
  options: any,
  label: string,
  value: string,
  defaultValue: string
};

class MessageMediaInteractiveWidgetSelect extends PureComponent {
  props: Props;

  handleChange = () => {
  };

  getOptions = () => this.props.options.map((option) => {
    return {
      value: option.value,
      title: option.label
    };
  });

  render() {
    const className = classNames(styles.widget, this.props.className);

    return (
      <div className={className}>
        <Select
          name="select_default"
          id="select_default"
          size="small"
          className={styles.select}
          onChange={this.handleChange}
          value={this.props.value || this.props.defaultValue}
          options={this.getOptions()}
        />
      </div>
    );
  }
}

export default MessageMediaInteractiveWidgetSelect;
