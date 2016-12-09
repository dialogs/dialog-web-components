/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Trigger from '../Trigger/Trigger';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Tooltip.css';

export type Props = {
  children?: any,
  text: string,
  openDelay?: number,
  closeDelay?: number,
  options: Object
};

class Tooltip extends PureComponent {
  props: Props;

  renderTooltip = (): React.Element<any> => {
    return (
      <CSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={100}
        transitionEnter={false}
        transitionLeave={false}
        transitionName={{
          appear: styles.appear,
          appearActive: styles.appearActive,
        }}
      >
        <Text id={this.props.text} className={styles.tooltip} tagName="div" />
      </CSSTransitionGroup>
    );
  };

  renderTrigger = (handlers: Object): React.Element<any> => {
    return (
      <div {...handlers} className={styles.wrapper}>{this.props.children}</div>
    );
  };

  render(): React.Element<any> {
    const options = {
      attachment: 'bottom center',
      targetAttachment: 'top center',
      constraints: [{
        to: 'scrollParent',
        attachment: 'together'
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
