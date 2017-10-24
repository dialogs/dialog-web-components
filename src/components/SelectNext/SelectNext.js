/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props, SelectOption, Option } from './types';
import React, { PureComponent } from 'react';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Select from 'react-select';
import Icon from '../Icon/Icon';
import styles from './SelectNext.css';

class SelectNext extends PureComponent {
  props: Props;
  select: Select;

  static defaultProps = {
    size: 'normal',
    theme: 'default',
    clearable: false,
    multi: false,
    searchable: false
  };

  static contextTypes = {
    l10n: LocalizationContextType
  };

  handleChange = (option: SelectOption): void => {
    if (option) {
      this.props.onChange(option.value);
    }
  };

  handleLabelMouseDown = (event: $FlowIssue): void => {
    event.preventDefault();

    if (this.select) {
      this.select.focus();
    }
  };

  getOptions = (): SelectOption[] => {
    return this.props.options.map((option: Option) => {
      return {
        value: option.value,
        label: option.title
      };
    });
  };

  getPlaceholder(): ?string {
    if (!this.props.placeholder) {
      return null;
    }

    return this.context.l10n.formatText(this.props.placeholder);
  }

  setSelect = (select: Select): void => {
    this.select = select;
  };

  focus(): void {
    if (this.select && document.activeElement !== this.select) {
      this.select.focus();
    }
  }

  renderLabel() {
    const { id, label } = this.props;

    if (!label) {
      return null;
    }

    return (
      <Text
        value={label}
        tagName="label"
        htmlFor={id}
        id={label}
        className={styles.label}
        onMouseDown={this.handleLabelMouseDown}
      />
    );
  }

  renderOption = (option: SelectOption) => {
    return (
      <Text id={option.label} />
    );
  };

  renderArrow = ({ onMouseDown, isOpen }: $FlowIssue) => {
    return (
      <div className={styles.arrow} onMouseDown={onMouseDown}>
        <Icon
          size={32}
          glyph={isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
          className={styles.arrowIcon}
        />
      </div>
    );
  };

  render() {
    const { id, name, disabled, size, theme, value, clearable, multi, searchable } = this.props;
    const className = classNames(styles.container, styles[size], styles[theme], {
      [styles.disabled]: disabled
    }, this.props.className);

    return (
      <div className={className}>
        {this.renderLabel()}
        <Select
          className={styles.select}
          id={id}
          name={name}
          disabled={disabled}
          value={value}
          clearable={clearable}
          searchable={searchable}
          placeholder={this.getPlaceholder()}
          multi={multi}
          ref={this.setSelect}
          options={this.getOptions()}
          onChange={this.handleChange}
          optionRenderer={this.renderOption}
          arrowRenderer={this.renderArrow}
        />
      </div>
    );
  }
}

export default SelectNext;
