/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './EmojiList.css';
import Image from '../Image/Image';

type Props = {
  id: number,
  title: string,
  image: string,
  active: boolean,
  onClick: (id: number) => any
};

class StickerTab extends PureComponent {
  props: Props;

  handleClick = (event: SyntheticMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.props.onClick(this.props.id);
  };

  render(): React.Element<any> {
    const className = classNames(styles.footerTabSticker, {
      [styles.active]: this.props.active
    });

    return (
      <div className={className}>
        <Image
          className={styles.stickerTabImage}
          src={this.props.image}
          alt={this.props.title}
          width={30}
          height={30}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default StickerTab;
