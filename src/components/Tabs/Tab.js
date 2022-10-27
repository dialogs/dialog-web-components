/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Tabs.css';

export type Props = {
  id: string,
  title: string,
  active: boolean,
  onPick: (id: string) => any
};

class Tab extends PureComponent {
  props: Props;

  handleClick = (): void => {
    this.props.onPick(this.props.id);
  };

  render(): React.Element<any> {
    const { title, active } = this.props;
    const className = classNames(styles.tab, {
      [styles.active]: active
    });

    return (
      <Text
        id={title}
        tagName="li"
        className={className}
        onClick={this.handleClick}
      />
    );
  }
}

export default Tab;
