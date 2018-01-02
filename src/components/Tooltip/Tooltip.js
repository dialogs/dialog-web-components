/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';
import Trigger from '../Trigger/Trigger';
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './Tooltip.css';

export type Props = {
  className?: string,
  children?: mixed,

  /**
   * Tooltip text. Will be translated using @dlghq/react-l10n.
   */
  text: Node,

  /**
   * [Tether options](http://tether.io/#options)
   */
  options?: Object,
  theme: 'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning'
};

class Tooltip extends Component<Props> {
  trigger: ?Trigger;

  static defaultProps = {
    theme: 'default'
  };

  componentWillUpdate(): void {
    if (this.trigger) {
      this.trigger.forceUpdate();
    }
  }

  setTrigger = (trigger: ?Trigger): void => {
    this.trigger = trigger;
  };

  renderTooltip = () => {
    const className = classNames(styles.tooltip, styles[this.props.theme]);

    return (
      <TransitionGroup>
        <CSSTransition
          appear
          timeout={{ appear: 100 }}
          classNames={{
            appear: styles.appear,
            appearActive: styles.appearActive
          }}
        >
          <div className={className}>
            {typeof this.props.text === 'string' ? (
              <Text id={this.props.text} />
            ) : (
              this.props.text
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  };

  renderTrigger = (handlers: Object) => {
    const className = classNames(styles.wrapper, this.props.className);

    return (
      <div {...handlers} className={className}>
        {this.props.children}
      </div>
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
