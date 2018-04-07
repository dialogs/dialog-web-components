/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext as Context } from '@dlghq/react-l10n';
import type { MessageMediaInteractiveActionGroup, MessageMediaInteractiveConfirm } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './MessageMediaInteractiveGroup.css';
import Markdown from '../../Markdown/Markdown';
import MessageMediaInteractiveAction from '../MessageMediaInteractiveAction/MessageMediaInteractiveAction';

export type Props = {
  className?: string,
  group: MessageMediaInteractiveActionGroup,
  onSubmit?: (id: string, value: string, confirm?: ?MessageMediaInteractiveConfirm) => mixed
};

class MessageMediaInteractiveGroup extends PureComponent<Props> {
  props: Props;
  context: Context;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  renderTitle() {
    if (!this.props.group.title) {
      return null;
    }

    return (
      <Markdown
        inline
        className={styles.title}
        text={this.context.l10n.formatText(this.props.group.title)}
        tagName="h5"
      />
    );
  }

  renderDescription() {
    if (!this.props.group.description) {
      return null;
    }

    return (
      <Markdown
        className={styles.description}
        text={this.context.l10n.formatText(this.props.group.description)}
        tagName="div"
      />
    );
  }

  renderHeader() {
    const title = this.renderTitle();
    const description = this.renderDescription();

    if (title || description) {
      return (
        <header className={styles.header}>
          {title}
          {description}
        </header>
      );
    }

    return null;
  }

  renderActions() {
    const children = this.props.group.actions.map((action) => {
      return <MessageMediaInteractiveAction key={action.id} action={action} onSubmit={this.props.onSubmit} />;
    });

    return (
      <div className={styles.actions}>
        {children}
      </div>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderHeader()}
        {this.renderActions()}
      </div>
    );
  }
}

export default MessageMediaInteractiveGroup;
