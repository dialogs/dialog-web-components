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
};

class Tooltip extends PureComponent {
  props: Props;
  getTooltip: () => React.Element<any>;

  constructor(props: Props) {
    super(props);

    this.getTooltip = this.getTooltip.bind(this);
  }

  getTooltip(): React.Element<any> {
    return (
      <Text id={this.props.text} className={styles.tooltip} tagName="div" />
    );
  }

  render(): React.Element<any> {
    const options = {
      attachment: 'bottom center',
      targetAttachment: 'top center',
      constraints: [{
        to: 'scrollParent',
        attachment: 'together'
      }]
    };

    return (
      <Trigger
        options={options}
        renderChild={this.getTooltip}
        openHandler={['onMouseEnter']}
        closeHandler={['onMouseLeave']}
        openDelay={this.props.openDelay}
        closeDelay={this.props.closeDelay}
      >
        {this.props.children}
      </Trigger>
    );
  }
}

export default Tooltip;
