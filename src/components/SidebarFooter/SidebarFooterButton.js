/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import Spinner from '../Spinner/Spinner';
import styles from './SidebarFooter.css';

export type Props = {
  className?: string,
  id: string,
  title: string,
  glyph: string,
  counter?: number,
  active: boolean,
  pending: boolean,
  onPick: (id: string) => any
};

class SidebarFooterButton extends PureComponent {
  props: Props;

  handleClick = (): void => {
    const { active, id } = this.props;

    if (!active) {
      this.props.onPick(id);
    }
  };

  renderIcon(): React.Element<any> {
    const { glyph, pending } = this.props;

    if (pending) {
      return (
        <Spinner size="normal" />
      );
    }

    return (
      <Icon glyph={glyph} className={styles.icon} />
    );
  }

  renderCounter(): ?React.Element<any> {
    const { counter, pending } = this.props;

    if (!counter || counter === 0 || pending) {
      return null;
    }

    const isBig = counter > 99;
    const counterClassName = classNames(styles.counter, isBig ? styles.counterBig : null);

    return (
      <div className={counterClassName}>{isBig ? '99+' : counter}</div>
    );
  }

  render(): React.Element<any> {
    const { active, title, id } = this.props;
    const className = classNames(styles.button, {
      [styles.active]: active
    }, this.props.className);

    return (
      <Tooltip text={title} key={id} className={styles.tooltip}>
        <div className={className} onClick={this.handleClick}>
          <div className={styles.wrapper}>
            {this.renderIcon()}
            {this.renderCounter()}
          </div>
        </div>
      </Tooltip>
    );
  }
}

export default SidebarFooterButton;
