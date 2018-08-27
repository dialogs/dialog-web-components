/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import CustomButton from './../../CustomButton/CustomButton';
import classNames from 'classnames';
import styles from './PadButton.css';

type Props = {
  className?: string,
  value: string,
  onPress: (value: string) => mixed
};

class PadButton extends PureComponent<Props> {
  handleClick = () => {
    this.props.onPress(this.props.value);
  };

  render() {
    const className = classNames(styles.wrapper, this.props.className);

    return (
      <div className={className}>
        <CustomButton
          className={styles.containerButton}
          size="large"
          value={this.props.value.toUpperCase()}
          onClick={this.handleClick}
          glyph={null}
        />
      </div>
    );
  }
}

export default PadButton;
