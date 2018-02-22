/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Markdown from '../Markdown/Markdown';
import styles from './CustomProfile.css';

export type Props = {
  className?: string,
  type: string,
  value: mixed,
  title: string
};

class CustomProfileProperty extends PureComponent<Props> {
  renderValue() {
    const { type, value } = this.props;

    switch (type) {
      case 'boolean':
        return <Text id={value ? 'Yes' : 'No'} className={styles.boolean} />;
      case 'number':
      case 'integer':
        return <div className={styles.number}>{String(value)}</div>;
      case 'string':
      default:
        return (
          <div className={styles.string}>
            <Markdown text={String(value)} />
          </div>
        );
    }
  }

  render() {
    const className = classNames(styles.property, this.props.className);

    return (
      <div className={className}>
        <div className={styles.title}>{this.props.title}</div>
        {this.renderValue()}
      </div>
    );
  }
}

export default CustomProfileProperty;
