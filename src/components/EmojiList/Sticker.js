/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Image from '../Image/Image';
import styles from './EmojiList.css';

export type Props = {
  sticker: Object,
  onClick: (sticker: Object) => void
};

class Sticker extends PureComponent {
  props: Props;

  handleClick = (): void => {
    this.props.onClick(this.props.sticker);
  };

  render(): ?React.Element<any> {
    const { sticker } = this.props;

    return (
      <div className={styles.sticker}>
        <Image
          src={sticker.image}
          alt={sticker.emoji}
          width={100}
          height={100}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Sticker;
