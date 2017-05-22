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
      <span className={this.props.titleClassName} onClick={this.props.onTitleClick}>
        <Markdown
          inline
          decorators={decorators}
          text={this.props.title}
        />
      </span>
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
