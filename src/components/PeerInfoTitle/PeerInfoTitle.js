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
      <span
        className={this.props.titleClassName}
        style={titleStyle}
        onClick={this.props.onTitleClick}
        title={this.props.title}
      >
        <Markdown
          inline
          decorators={decorators}
          text={this.props.title}
        />
        &nbsp;&nbsp;
      </span>
    );

    if (this.props.userName) {
      const userNameStyle = this.props.onUserNameClick ? { cursor: 'pointer' } : undefined;

      return (
        <span className={this.props.className}>
          {title}
          <span
            className={this.props.userNameClassName}
            style={userNameStyle}
            onClick={this.props.onUserNameClick}
            title={`@${this.props.userName}`}
          >
            {`@${this.props.userName}`}
            &nbsp;&nbsp;
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
