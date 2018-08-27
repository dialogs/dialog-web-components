/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Pad.css';
import PadButton from '../PadButton/PadButton';

type Props = {
  className?: string,
  buttons: string[],
  onPress: (value: string) => mixed
};

class Pad extends PureComponent<Props> {
  static defaultProps = {
    buttons: [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8', '9',
      '*', '0', '#'
    ]
  };

  handleInsert = (value: string) => {

  };

  handleBackspace = () => {

  };

  render() {
    const className = classNames(styles.container, this.props.className);

    const buttons = this.props.buttons.map((value) => {
      return (
        <PadButton
          key={value}
          value={value}
          onPress={this.props.onPress}
        />
      );
    });

    return (
      <div className={className}>
        <div className={styles.buttons}>
          {buttons}
        </div>
      </div>
    );
  }
}

export default Pad;
