/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { StickerPack } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import styles from './EmojiList.css';
import StickerItem from './StickerItem';

type Props = {
  pack: StickerPack,
  height: number,
  isActive: boolean,
  isVisible: boolean,
  isAtBottom: boolean,
  onClick: (sticker: Object) => any
};

class StickerCategory extends PureComponent {
  props: Props;

  renderPacks() {
    if (!this.props.isVisible) {
      return null;
    }

    return this.props.pack.stickers.map((sticker) => {
      return (
        <StickerItem
          key={sticker.id}
          sticker={sticker}
          onClick={this.props.onClick}
        />
      );
    });
  }

  render(): React.Element<any> {
    const { pack } = this.props;

    const containerStyles: Object = {
      height: this.props.height
    };

    const titleStyles = {};

    if (this.props.isActive) {
      if (this.props.isAtBottom) {
        containerStyles.position = 'relative';
        titleStyles.bottom = 0;
        titleStyles.top = 'auto';
      } else {
        titleStyles.top = 0;
        containerStyles.position = 'static';
      }
    } else {
      titleStyles.top = 0;
    }

    return (
      <div className={styles.category} style={containerStyles} data-category={pack.id}>
        <div className={styles.categoryTitle} style={titleStyles}>
          {pack.title}
        </div>
        <div className={styles.categoryList}>
          {this.renderPacks()}
        </div>
      </div>
    );
  }
}

export default StickerCategory;
