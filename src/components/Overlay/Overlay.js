/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import classNames from 'classnames';
import styles from './Overlay.css';

export type Props = {
  className?: string,
  children?: any,
  active: boolean,
  renderCaption?: () => any,
  onClick: () => any
};

const transitionStyles = {
  enter: styles.enter,
  enterActive: styles.enterActive,
  leave: styles.leave,
  leaveActive: styles.leaveActive
};

class Overlay extends PureComponent {
  props: Props;

  renderOverlay(): ?React.Element<any> {
    const { active } = this.props;

    if (!active) {
      return null;
    }

    return (
      <div className={styles.overlay} onClick={this.props.onClick}>
        {this.props.renderCaption ? (
          <div className={styles.caption}>
            {this.props.renderCaption()}
          </div>
        ) : null}
      </div>
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <CSSTransitionGroup
          transitionName={transitionStyles}
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}
        >
          {this.renderOverlay()}
        </CSSTransitionGroup>
        {this.props.children}
      </div>
    );
  }
}

export default Overlay;
