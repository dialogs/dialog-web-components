/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './SelectedMessagesActions.css';

export type Props = {
  className?: string,
  count: number,
  onDelete?: () => any,
  onForward?: () => any,
  onReply?: () => any
};

class SelectedMessagesActions extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.props.onDelete ? (
          <Button
            onClick={this.props.onDelete}
            view="link"
            size="small"
            theme="primary"
            className={styles.button}
          >
            <Icon glyph="delete" className={styles.buttonIcon} />
            <Text id="SelectedMessagesActions.delete" className={styles.buttonText} />
          </Button>
        ) : null}
        <div className={styles.text}>
          <Text id="SelectedMessagesActions.text" values={{ count: this.props.count.toString() }} html />
        </div>
        {this.props.onReply ? (
          <Button
            onClick={this.props.onReply}
            view="link"
            size="small"
            theme="primary"
            className={styles.button}
          >
            <Icon glyph="reply" className={styles.buttonIcon} />
            <Text id="SelectedMessagesActions.reply" className={styles.buttonText} />
          </Button>
        ) : null}
        {this.props.onForward ? (
          <Button
            onClick={this.props.onForward}
            view="link"
            size="small"
            theme="primary"
            className={styles.button}
          >
            <Icon glyph="forward" className={styles.buttonIcon} />
            <Text id="SelectedMessagesActions.forward" className={styles.buttonText} />
          </Button>
        ) : null}
      </div>
    );
  }
}

export default SelectedMessagesActions;
