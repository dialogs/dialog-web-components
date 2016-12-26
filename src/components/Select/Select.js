/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from './types';
import React, { PureComponent } from 'react';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './Select.css';

class Select extends PureComponent {
  props: Props;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  handleChange = (event: $FlowIssue): void => {
    this.props.onChange(event.target.value, event);
  };

  renderPlaceholder(): ?React.Element<any> {
    const { placeholder } = this.props;

    if (!placeholder) {
      return null;
    }

    return (
      <Text
        key={placeholder}
        tagName="option"
        id={placeholder}
        disabled
        selected
        style={{ display: 'none' }}
      />
    );
  }

  renderOptions(): React.Element<any>[] {
    return this.props.options.map((option) => {
      return (
        <Text
          value={option.value}
          key={option.value}
          tagName="option"
          id={option.title}
        />
      );
    });
  }

  render(): React.Element<any> {
    const { id, name, disabled } = this.props;
    const className = classNames(styles.container, {
      [styles.disabled]: disabled
    }, this.props.className);

    return (
      <div className={className}>
        <select
          className={styles.select}
          id={id}
          name={name}
          disabled={disabled}
          value={this.props.value}
          onChange={this.handleChange}
        >
          {this.renderPlaceholder()}
          {this.renderOptions()}
        </select>
        <Icon glyph="arrow_drop_down" className={styles.arrow} />
      </div>
    );
  }
}

export default Select;
