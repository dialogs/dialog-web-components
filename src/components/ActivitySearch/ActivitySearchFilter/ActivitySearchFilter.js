/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './ActivitySearchFilter.css';

type Props = {
  className?: string
};

class ActivitySearchFilter extends PureComponent {
  props: Props;

  render() {
    const className = classNames(styles.filter, this.props.className);

    return (
      <div className={className}>
        <div className={styles.filterRel}>
          <span>Relevant</span>
        </div>
        <div className={styles.filterInc}>
          Includes: <span>Everything</span>
        </div>
      </div>
    );
  }
}

export default ActivitySearchFilter;
