/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Select.css';

export type Option = {
  value: string,
  title: string
};

export type Props = {
  option: Option,
  active: boolean,
  onClick: (value: string) => any
};

class SelectOption extends PureComponent {
  props: Props

  handleClick = (): void => {
    this.props.onClick(this.props.option.value);
  };

  render(): React.Element<any> {
    const className = classNames(
      styles.option,
      this.props.active ? styles.optionActive : null
    );

    return (
      <div className={className} onClick={this.handleClick}>
        {this.props.option.title}
      </div>
    );
  }
}

export default SelectOption;
