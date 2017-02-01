/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import styles from './EmojiList.css';
import Sticker from './Sticker';

type Props = {
  id: number,
  title: string,
  stickers: Object[],
  onClick: (sticker: Object) => any
};

class StickerCategory extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    const children = this.props.stickers.map((sticker) => {
      return (
        <Sticker
          key={sticker.id}
          sticker={sticker}
          onClick={this.props.onClick}
        />
      );
    });

    return (
      <div className={styles.category} data-category={this.props.id}>
        <div className={styles.categoryTitle}>{this.props.title}</div>
        <div className={styles.categoryList}>{children}</div>
      </div>
    );
  }
}

export default StickerCategory;
