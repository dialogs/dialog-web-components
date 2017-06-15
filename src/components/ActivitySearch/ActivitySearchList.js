/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ActivitySearchListProps as Props } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ActivitySearchItem from './ActivitySearchItem';
import styles from './ActivitySearchList.css';

class ActivitySearchList extends PureComponent {
  props: Props;

  renderResults() {
    const { results } = this.props;

    return results.map((item) => {
      return (
        <ActivitySearchItem
          key={item.focus.rid}
          info={item.info}
          before={item.before}
          after={item.after}
          focus={item.focus}
          onGoToMessage={this.props.onGoToMessage}
        />
      );
    });
  }

  render() {
    if (!this.props.results.length) {
      return null;
    }

    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderResults()}
      </div>
    );
  }
}

export default ActivitySearchList;
