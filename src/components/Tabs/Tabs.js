/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Tab from './Tab';
import styles from './Tabs.css';

export type Props = {
  className?: string,
  current: string,
  variants: Array<{ id: string, title: string }>,
  onPick: (current: string) => any
};

class Tabs extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    const { current, variants } = this.props;
    const className = classNames(styles.container, this.props.className);

    const tabs = variants.map(({ id, title }) => {
      const active = id === current;

      return (
        <Tab
          id={id}
          key={id}
          title={title}
          active={active}
          onPick={this.props.onPick}
        />
      );
    });

    return (
      <ul className={className}>
        {tabs}
      </ul>
    );
  }
}

export default Tabs;
