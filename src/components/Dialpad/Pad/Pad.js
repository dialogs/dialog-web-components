/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';

import styles from './Pad.css';
import PadButton from '../PadButton/PadButton';

type Props = {
  className?: string,
  buttons: string[],
  onPress: (value: string) => mixed,
};

class Pad extends PureComponent<Props> {
  static defaultProps = {
    buttons: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
  };

  renderButtons(): Node {
    return this.props.buttons.map((value) => {
      return (
        <PadButton key={value} value={value} onClick={this.props.onPress} />
      );
    });
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return <div className={className}>{this.renderButtons()}</div>;
  }
}

export default Pad;
