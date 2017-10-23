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

type State = {
  value?: string
};

class MessageMediaInteractiveWidgetSelect extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  handleChange = (value: string) => {
    this.setState({ value });
    this.props.onSubmit(value);
  };

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
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default MessageMediaInteractiveWidgetSelect;
