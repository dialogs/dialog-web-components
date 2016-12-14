/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './EmojiList.css';

type Props = {
  name: string,
  glyph: string,
  active: boolean,
  onClick: (name: string) => any
};

class EmojiTab extends PureComponent {
  props: Props;

  handleClick = () => {
    this.props.onClick(this.props.name);
  };

  render(): React.Element<any> {
    const className = classNames(styles.footerTabIcon, this.props.active ? styles.active : null);

    return (
      <div title={this.props.name} className={styles.footerTab}>
        <Icon glyph={this.props.glyph} className={className} onClick={this.handleClick} />
      </div>
    );
  }
}

export default EmojiTab;
