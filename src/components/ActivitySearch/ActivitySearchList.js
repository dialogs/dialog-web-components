/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ActivitySearchListProps as Props } from './types';
import { Text } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import Emoji from '../Emoji/Emoji';
import ActivitySearchItem from './ActivitySearchItem';
import styles from './ActivitySearchList.css';

class ActivitySearchList extends PureComponent {
  props: Props;

  renderResults() {
    const { result } = this.props;

    if (result.pending) {
      return (
        <div className={styles.spinnerWrapper}>
          <Spinner className={styles.spinner} size="large" />
        </div>
      );
    }

    if (result.error) {
      return (
        <div className={styles.error}>
          <Error>{result.error}</Error>
        </div>
      );
    }

    if (!result.value.length) {
      return (
        <div className={styles.notFound}>
          <Emoji char="☹" size={64} className={styles.notFoundEmoji} />
          <Text
            html
            tagName="div"
            id="ActivitySearch.not_found"
            values={{ query: this.props.query }}
          />
        </div>
      );
    }

    return result.value.map((item) => {
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
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderResults()}
      </div>
    );
  }
}

export default ActivitySearchList;
