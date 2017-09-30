/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Tooltip from '../Tooltip/Tooltip';
import Icon from '../Icon/Icon';
import styles from './ScrollToBottom.css';

export type Props = {
  className?: string,
  counter?: number,
  onClick: () => mixed
};

class ScrollToBottom extends PureComponent {
  props: Props;

  renderCounter() {
    const { counter } = this.props;

    if (!counter || counter === 0) {
      return null;
    }

    return (
      <div className={styles.counter}>{counter}</div>
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <Tooltip text="ScrollToBottom.text">
        <div className={className} onClick={this.props.onClick}>
          {this.renderCounter()}
          <Icon
            className={styles.icon}
            size={26}
            glyph="arrow_down"
          />
        </div>
      </Tooltip>
    );
  }
}

export default ScrollToBottom;
