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
  onPick: (id: string) => mixed
};

class Tab extends PureComponent<Props> {
  handleClick = (): void => {
    this.props.onPick(this.props.id);
  };

  render() {
    const { title, active, id } = this.props;
    const className = classNames(styles.tab, {
      [styles.active]: active
    });

    return (
      <li className={className} onClick={this.handleClick} id={`tabs_tab_${id}`}>
        <Text id={title} />
      </li>
    );
  }
}

export default Tab;
