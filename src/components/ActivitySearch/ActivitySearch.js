/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ActivitySearchProps as Props } from './types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ActivityHeader from '../ActivityHeader/ActivityHeader';
import ActivitySearchFilter from './ActivitySearchFilter';
import ActivitySearchList from './ActivitySearchList';
import styles from './ActivitySearch.css';

class ActivitySearch extends PureComponent {
  props: Props;

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <ActivityHeader onClose={this.props.onClose} className={styles.header}>
          <Text id="ActivitySearch.header" tagName="div" className={styles.headerText} />
          {/* Tabs here */}
        </ActivityHeader>

        <ActivitySearchFilter />

        <ActivitySearchList
          results={this.props.results}
          onJumpToMessage={this.props.onJumpToMessage}
        />
      </div>
    );
  }
}

export default ActivitySearch;
