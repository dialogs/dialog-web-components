/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Trigger from '../Trigger/Trigger';
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
      <Text id={this.props.text} className={styles.tooltip} tagName="div" />
    );
  };

  renderTrigger = (handlers: Object): React.Element<any> => {
    return (
      <span {...handlers}>{this.props.children}</span>
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
