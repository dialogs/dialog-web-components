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

    return results.map((item, index) => {
      return (
        <ActivitySearchItem
          key={`search_resilt_${index}`}
          info={item.info}
          messages={item.messages}
          focus={item.focus}
          highlight={item.highlight}
          onJump={this.props.onJumpToMessage}
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
