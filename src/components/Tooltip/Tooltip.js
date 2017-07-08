/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { Text } from '@dlghq/react-l10n';
import Trigger from '../Trigger/Trigger';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import styles from './Tooltip.css';

export type Props = {
  className?: string,
  children?: any,

  /**
   * Tooltip text. Will be translated using @dlghq/react-l10n.
   */
  text: string | React.Element<*>,

  /**
   * [Tether options](http://tether.io/#options)
   */
  options?: Object
};

class Tooltip extends Component {
  props: Props;
  trigger: ?Trigger;

  componentWillUpdate(): void {
    if (this.trigger) {
      this.trigger.forceUpdate();
    }
  }

  setTrigger = (trigger: ?Trigger): void => {
    this.trigger = trigger;
  };

  renderContent() {
    if (typeof this.props.text === 'string') {
      return (
        <Text id={this.props.text} />
      );
    }

    return this.props.text;
  }

  renderTooltip = () => {
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
        <div className={styles.tooltip}>
          {this.renderContent()}
        </div>
      </CSSTransitionGroup>
    );
  };

  renderTrigger = (handlers: Object) => {
    const className = classNames(styles.wrapper, this.props.className);

    return (
      <div {...handlers} className={className}>{this.props.children}</div>
    );
  };

  render() {
    const options = {
      attachment: 'bottom center',
      targetAttachment: 'top center',
      constraints: [
        {
          to: 'scrollParent',
          attachment: 'together',
          pin: true
        }
      ],
      ...this.props.options
    };

    return (
      <Trigger
        options={options}
        openHandler={['onMouseEnter']}
        closeHandler={['onMouseLeave']}
        ref={this.setTrigger}
        renderTrigger={this.renderTrigger}
        renderChild={this.renderTooltip}
      />
    );
  }
}

export default Tooltip;
