/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Trigger from '../Trigger/Trigger';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Tooltip.css';

export type Props = {
  children?: any,
  text: string,
  openDelay?: number,
  closeDelay?: number,
  options?: Object,
  className?: string
};

class Tooltip extends PureComponent {
  props: Props;

  renderTooltip = (): React.Element<any> => {
    return (
      <CSSTransitionGroup
        transitionAppear
        transitionEnter={false}
        transitionLeave={false}
        transitionAppearTimeout={100}
        transitionName={{
          appear: styles.appear,
          appearActive: styles.appearActive
        }}
      >
        <Text id={this.props.text} className={styles.tooltip} tagName="div" />
      </CSSTransitionGroup>
    );
  };

  renderTrigger = (handlers: Object): React.Element<any> => {
    const className = classNames(styles.wrapper, this.props.className);

    return (
      <div {...handlers} className={className}>{this.props.children}</div>
    );
  };

  render(): React.Element<any> {
    const options = {
      attachment: 'bottom center',
      targetAttachment: 'top center',
      constraints: [{
        to: 'scrollParent',
        attachment: 'together',
        pin: true
      }],
      ...this.props.options
    };

    return (
      <Trigger
        options={options}
        renderTrigger={this.renderTrigger}
        renderChild={this.renderTooltip}
        openHandler={['onMouseEnter']}
        closeHandler={['onMouseLeave']}
        openDelay={this.props.openDelay}
        closeDelay={this.props.closeDelay}
      />
    );
  }
}

export default Tooltip;
