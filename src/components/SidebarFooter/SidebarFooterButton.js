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

  render(): React.Element<any> {
    const { glyph, active, title, id, pending } = this.props;
    const className = classNames(styles.button, {
      [styles.active]: active
    }, this.props.className);

    return (
      <Tooltip text={title} key={id} className={styles.tooltip}>
        <div className={className} onClick={this.handleClick}>
          {
            pending
              ? <div className={styles.spinner}><Spinner size="normal" /></div>
              : <Icon glyph={glyph} className={styles.icon} />
          }
        </div>
      </Tooltip>
    );
  }
}

export default SidebarFooterButton;
