/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer } from '@dlghq/dialog-types';
import type { Card } from '../DiscoverCard/DiscoverCard';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';

import Button from '../Button/Button';
import DiscoverCard from '../DiscoverCard/DiscoverCard';
import styles from './Discover.css';

export type Props = {
  className?: string,
  items: Card[],
  onCreateNew: () => mixed,
  onGoToPeer: (peer: Peer) => mixed,
};

class Discover extends PureComponent<Props> {
  renderCards(): Node {
    const { items } = this.props;

    return items.map((card) => {
      return (
        <div className={styles.cardWrapper} key={`card_${card.peer.id}`}>
          <DiscoverCard {...card} onGoToPeer={this.props.onGoToPeer} />
        </div>
      );
    });
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <Text id="Discover.title" tagName="h1" className={styles.title} />
            <Text
              id="Discover.subtitle"
              tagName="h3"
              className={styles.subTitle}
            />
          </div>
          <div className={styles.headerControls}>
            <Button
              size="small"
              className={styles.headerButton}
              theme="primary"
              view="outline"
              onClick={this.props.onCreateNew}
              id="discover_create_new_button"
            >
              <Text id="Discover.create_new" />
            </Button>
          </div>
        </header>

        <div className={styles.cards}>{this.renderCards()}</div>
      </div>
    );
  }
}

export default Discover;
