/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { StickerPack, Sticker } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { Text } from '@dlghq/react-l10n';
import { throttle } from 'lodash';
import { listen } from '@dlghq/dialog-utils';
import classNames from 'classnames';
import categories from './categories';
import EmojiTab from './EmojiTab';
import EmojiCategory from './EmojiCategory';
import StickerTab from './StickerTab';
import StickerCategory from './StickerCategory';
import styles from './EmojiList.css';

export type Props = {
  className?: string,
  recent?: string[],
  stickers?: StickerPack[],
  onClick: (char: string) => void,
  onStickerClick: (sticker: Sticker) => void
};

type Screen = 'emoji' | 'stickers';

export type State = {
  current: string,
  screen: Screen
};

class EmojiList extends PureComponent {
  props: Props;
  state: State;
  container: ?HTMLElement;
  categories: { [key: string]: HTMLElement };
  listener: ?{ remove(): void };

  constructor(props: Props) {
    super(props);

    this.state = {
      screen: 'emoji',
      current: (props.recent && props.recent.length) ? 'recent' : categories[0].name
    };

    this.categories = {};

    this.handleScroll = throttle(this.handleScroll, 16);
  }

  componentDidMount(): void {
    if (this.container) {
      this.listener = listen(this.container, 'scroll', this.handleScroll, { passive: true });
    }
  }

  componentWillUnmount(): void {
    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }
  }

  handleToggleScreen = (): void => {
    this.setState(() => {
      const { stickers } = this.props;

      if (stickers && stickers.length) {
        this.categories = {};
        if (this.container) {
          this.container.scrollTop = 0;
        }

        return {
          screen: this.getNextScreen(),
          current: String(stickers[0].id)
        };
      }

      return {};
    });
  };

  handleTabClick = (next: string): void => {
    this.setState(() => {
      const node = this.categories[next];
      if (node && this.container) {
        this.container.scrollTop = node.offsetTop;
      }

      return {
        current: next
      };
    });
  };

  handleScroll = ({ target }: $FlowIssue): void => {
    const { scrollTop } = target;
    const breakpoints = Object.keys(this.categories).map((name) => {
      const node = this.categories[name];
      return {
        name,
        offset: node.offsetTop
      };
    });

    if (breakpoints.length) {
      breakpoints.sort((left, right) => left.offset - right.offset);

      const firstOffset = breakpoints[0].offset;

      for (let i = breakpoints.length - 1; i >= 0; i--) {
        const breakpoint = breakpoints[i];
        if (breakpoint.offset - firstOffset <= scrollTop) {
          this.setState({
            current: breakpoint.name
          });
          break;
        }
      }
    }
  };

  getNextScreen(): Screen {
    return this.state.screen === 'emoji' ? 'stickers' : 'emoji';
  }

  setContainer = (container: ?HTMLElement): void => {
    this.container = container;
  };

  setCategory = (category: ?EmojiCategory): void => {
    if (category) {
      const node = findDOMNode(category);
      if (node) {
        this.categories[node.dataset.category] = node;
      }
    }
  };

  renderCategories(): React.Element<any>[] {
    const result = [];

    if (this.state.screen === 'emoji') {
      if (this.props.recent && this.props.recent.length) {
        result.push(
          <EmojiCategory
            key="recent"
            name="recent"
            chars={this.props.recent}
            ref={this.setCategory}
            onClick={this.props.onClick}
          />
        );
      }

      for (const { name, chars } of categories) {
        result.push(
          <EmojiCategory
            key={name}
            name={name}
            chars={chars}
            ref={this.setCategory}
            onClick={this.props.onClick}
          />
        );
      }
    } else if (this.props.stickers) {
      for (const pack of this.props.stickers) {
        result.push(
          <StickerCategory
            key={pack.id}
            pack={pack}
            ref={this.setCategory}
            onClick={this.props.onStickerClick}
          />
        );
      }
    }

    return result;
  }

  renderTabs(): React.Element<any> {
    const children = [];

    if (this.state.screen === 'emoji') {
      children.push(
        <EmojiTab
          key="recent"
          name="recent"
          glyph="schedule"
          disabled={this.props.recent && this.props.recent.length === 0}
          active={this.state.current === 'recent'}
          onClick={this.handleTabClick}
        />
      );

      for (const { name, glyph } of categories) {
        children.push(
          <EmojiTab
            key={name}
            name={name}
            glyph={glyph}
            active={this.state.current === name}
            onClick={this.handleTabClick}
          />
        );
      }
    } else if (this.props.stickers) {
      for (const pack of this.props.stickers) {
        children.push(
          <StickerTab
            key={pack.id}
            pack={pack}
            active={this.state.current === String(pack.id)}
            onClick={this.handleTabClick}
          />
        );
      }
    }

    const className = classNames(styles.footer, {
      [styles.footerStickers]: this.state.screen === 'stickers'
    });

    return (
      <footer className={className}>
        {children}
      </footer>
    );
  }

  renderGoToButton(): ?React.Element<any> {
    const { stickers } = this.props;
    if (!stickers || !stickers.length) {
      return null;
    }

    return (
      <Text
        id={`EmojiList.screen.${this.getNextScreen()}`}
        tagName="button"
        className={styles.goToButton}
        onClick={this.handleToggleScreen}
      />
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <section className={className}>
        {this.renderGoToButton()}
        <div className={styles.body} ref={this.setContainer}>
          {this.renderCategories()}
        </div>
        {this.renderTabs()}
      </section>
    );
  }
}

export default EmojiList;
