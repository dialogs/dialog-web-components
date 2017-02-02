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
  onClick: (sticker: Object) => any
};

class StickerCategory extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    const { pack } = this.props;
    const children = pack.stickers.map((sticker) => {
      return (
        <StickerItem
          key={sticker.id}
          sticker={sticker}
          onClick={this.props.onClick}
        />
      );
    });

    return (
      <div className={styles.category} data-category={pack.id}>
        <div className={styles.categoryTitle}>{pack.title}</div>
        <div className={styles.categoryList}>{children}</div>
      </div>
    );
  }
}

export default StickerCategory;
