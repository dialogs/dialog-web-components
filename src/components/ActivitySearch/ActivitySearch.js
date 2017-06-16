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

  renderFilter() {
    if (!this.props.filter) {
      return null;
    }

    return (
      <ActivitySearchFilter />
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <ActivityHeader onClose={this.props.onClose} className={styles.header}>
          <Text id="ActivitySearch.header" tagName="div" className={styles.headerText} />
        </ActivityHeader>

        {this.renderFilter()}

        <ActivitySearchList
          query={this.props.query}
          result={this.props.result}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
        />
      </div>
    );
  }
}

export default ActivitySearch;
