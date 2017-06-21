/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Markdown from '../Markdown/Markdown';
import decorators from './decorators';

type Props = {
  title: string,
  userName?: ?string,
  className?: string,
  titleClassName?: string,
  userNameClassName?: string,
  onTitleClick?: ?(event: SyntheticMouseEvent) => mixed,
  onUserNameClick?: ?(event: SyntheticMouseEvent) => mixed
};

class PeerInfoTitle extends PureComponent {
  props: Props;

  render() {
    const titleStyle = this.props.onTitleClick ? { cursor: 'pointer' } : undefined;
    const title = (
      <span className={this.props.titleClassName} style={titleStyle} onClick={this.props.onTitleClick}>
        <Markdown
          inline
          decorators={decorators}
          text={this.props.title}
        />
      </span>
    );

    if (this.props.userName) {
      const userNameStyle = this.props.onUserNameClick ? { cursor: 'pointer' } : undefined;

      return (
        <span style={{ lineHeight: '1' }}>
          <span className={this.props.className}>
            {title}
            {' '}
          </span>
          <span className={this.props.userNameClassName} style={userNameStyle} onClick={this.props.onUserNameClick}>
            {`@${this.props.userName}`}
          </span>
        </span>
      );
    }

    return (
      <span className={this.props.className}>
        {title}
      </span>
    );
  }
}

export default PeerInfoTitle;
