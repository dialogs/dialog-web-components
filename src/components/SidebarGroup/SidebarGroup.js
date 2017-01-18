/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import SidebarGroupTitle from './SidebarGroupTitle';
import styles from './SidebarGroup.css';

export type Props = {
  className?: string,
  title: string,
  children?: React.Element<any>[]
};

class SidebarGroup extends PureComponent {
  props: Props;

  render() {
    const { title, children } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <SidebarGroupTitle title={title} />
        {children}
      </div>
    );
  }
}

export default SidebarGroup;
