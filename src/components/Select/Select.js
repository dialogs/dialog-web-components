/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Option } from './SelectOption';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import SelectOption from './SelectOption';
import { listen } from '@dlghq/dialog-utils';
import styles from './Select.css';

export type Props = {
  className?: string,
  // id: string,
  // name?: string,
  value: string,
  // disabled?: boolean,
  options: Option[],
  placeholder: ?string,
  onChange: (value: string) => any
};

export type State = {
  isOpen: boolean
}

class Select extends Component {
  props: Props;
  state: State;
  listener: ?{ remove(): void };

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentWillUnmount(): void {
    this.removeListener();
  }

  handleChange = (value: string): void => {
    this.handleClose();
    this.props.onChange(value);
  };

  handleOpen = (): void => {
    this.setListener();
    this.setState({ isOpen: true });
  };

  handleClose = (): void => {
    this.removeListener();
    this.setState({ isOpen: false });
  }

  getLabel(): string {
    for (const option of this.props.options) {
      if (option.value === this.props.value) {
        return option.title;
      }
    }

    return this.props.placeholder || '';
  }

  setListener = (): void => {
    this.listener = listen(document, 'click', this.handleClose, { passive: true });
  };

  removeListener = (): void => {
    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }
  };

  renderOptions(): React.Element<any>[] {
    return this.props.options.map((option) => {
      return (
        <SelectOption
          option={option}
          key={option.value}
          active={this.props.value === option.value}
          onClick={this.handleChange}
        />
      );
    });
  }

  renderOptionsDropdown(): ?React.Element<any> {
    const { isOpen } = this.state;
    if (!isOpen) {
      return null;
    }

    return (
      <div className={styles.options}>
        {this.renderOptions()}
      </div>
    );
  }

  render(): React.Element<any> {
    const { isOpen } = this.state;
    const className = classNames(
      styles.container,
      isOpen ? styles.opened : null,
      this.props.className
    );

    return (
      <div className={className}>
        <div className={styles.select} onClick={this.handleOpen}>
          <div className={styles.value}>
            {this.getLabel()}
          </div>
          <Icon glyph="arrow_drop_down" className={styles.arrow} />
        </div>
        {this.renderOptionsDropdown()}
      </div>
    );
  }
}

export default Select;
