/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../Tabs/Tabs.css';

export type Props = {
  children?: any,
  active: boolean,
  value: string,
  onClick: Function,
}

class Tab extends Component {
  props: Props;

  handleClick: Function;

  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.children !== this.props.children ||
           nextProps.active !== this.props.active ||
           nextProps.value !== this.props.value;
  }

  handleClick(event: $FlowIssue): void {
    const { value, active } = this.props;

    if (!active) {
      this.props.onClick(value, event);
    }
  }

  render(): React.Element<any> {
    const { active } = this.props;
    const className = classNames(styles.tab, {
      [styles.active]: active
    });

    return (
      <li onClick={this.handleClick} className={className}>
        {this.props.children}
      </li>
    );
  }
}

export default Tab;
