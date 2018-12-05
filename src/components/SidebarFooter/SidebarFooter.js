/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props, SidebarFooterButtonVariant } from './types';
import React, { PureComponent, type Node } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import SidebarFooterButton from './SidebarFooterButton';
import SidebarUpdateButton from './SidebarUpdateButton';
import styles from './SidebarFooter.css';

class SidebarFooter extends PureComponent<Props> {
  rendereFooterButtons(): Node {
    const { current, variants } = this.props;

    return variants.map(
      ({ id, title, glyph, pending, counter }: SidebarFooterButtonVariant) => {
        return (
          <SidebarFooterButton
            id={id}
            key={id}
            title={title}
            glyph={glyph}
            pending={pending}
            active={id === current}
            counter={counter}
            onPick={this.props.onPick}
          />
        );
      },
    );
  }

  renderUpdateButton() {
    const { isUpdateAvailable } = this.props;

    if (!isUpdateAvailable) {
      return null;
    }

    return (
      <TransitionGroup>
        <CSSTransition
          appear
          timeout={{ appear: 100 }}
          classNames={{
            appear: styles.appear,
            appearActive: styles.appearActive,
          }}
        >
          <SidebarUpdateButton onClick={this.props.onUpdate} />
        </CSSTransition>
      </TransitionGroup>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.rendereFooterButtons()}
        {this.renderUpdateButton()}
      </div>
    );
  }
}

export default SidebarFooter;
