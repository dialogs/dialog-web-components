/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { StickerPack } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './EmojiList.css';
import Image from '../Image/Image';

type Props = {
  pack: StickerPack,
  active: boolean,
  onClick: (id: string) => void
};

class StickerTab extends PureComponent {
  props: Props;

  handleClick = (event: SyntheticMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.props.onClick(String(this.props.pack.id));
  };

  getCoverImage(): ?string {
    const { pack } = this.props;
    if (pack.stickers.length) {
      return pack.stickers[0].image;
    }

    return null;
  }

  render(): React.Element<any> {
    const className = classNames(styles.footerTabSticker, {
      [styles.active]: this.props.active
    });

    return (
      <div className={className}>
        <Image
          className={styles.stickerTabImage}
          src={this.getCoverImage()}
          alt={this.props.pack.title}
          width={30}
          height={30}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default StickerTab;
