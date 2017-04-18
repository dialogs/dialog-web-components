/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props, SidebarFooterButtonVariant } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import SidebarFooterButton from './SidebarFooterButton';
import styles from './SidebarFooter.css';

class SidebarFooter extends PureComponent {
  props: Props;

  rendereFooterButtons(): React.Element<any>[] {
    const { current, variants } = this.props;

    return variants.map(({ id, title, glyph, pending, counter }: SidebarFooterButtonVariant) => {
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
    });
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.rendereFooterButtons()}
      </div>
    );
  }
}

export default SidebarFooter;
