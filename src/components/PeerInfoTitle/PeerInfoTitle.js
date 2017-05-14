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
  onTitleClick?: ?(event: SyntheticEvent) => mixed,
  onUserNameClick?: ?(event: SyntheticEvent) => mixed
};

class PeerInfoTitle extends PureComponent {
  props: Props;

  render() {
    const title = (
      <Markdown
        inline
        decorators={decorators}
        className={this.props.titleClassName}
        text={this.props.title}
        onClick={this.props.onTitleClick}
      />
    );

    if (this.props.userName) {
      return (
        <span className={this.props.className}>
          {title}
          {' '}
          <span className={this.props.userNameClassName} onClick={this.props.onUserNameClick}>
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
