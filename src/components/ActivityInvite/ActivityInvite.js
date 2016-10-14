/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Clipboard from 'clipboard';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import styles from './ActivityInvite.css';

export type Props = {
  className?: string,
  link: string,
  pending: boolean,
  onRevoke: () => any
};

export type State = {
  copied: ?boolean
};

class ActivityInvite extends PureComponent {
  props: Props;
  state: State;
  clipboard: ?Clipboard;

  handleCopyError: Function;
  handleCopySuccess: Function;
  handleButtonMount: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      copied: null
    };

    this.handleCopyError = this.handleCopyError.bind(this);
    this.handleCopySuccess = this.handleCopySuccess.bind(this);
    this.handleButtonMount = this.handleButtonMount.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.link !== this.props.link ||
      nextProps.pending !== this.props.pending
    ) {
      this.setState({ copied: null });
    }
  }

  componentWillUnmount(): void {
    if (this.clipboard) {
      this.clipboard.destroy();
      this.clipboard = null;
    }
  }

  handleCopyError(): void {
    this.setState({ copied: false });
  }

  handleCopySuccess(event?: $FlowIssue) {
    this.setState({ copied: true });

    if (event) {
      event.clearSelection();
    }
  }

  handleButtonMount(element: React.Component<any, any, any>) {
    if (this.clipboard) {
      this.clipboard.destroy();
      this.clipboard = null;
    }

    const button = findDOMNode(element);
    if (button) {
      const clipboard = new Clipboard(button, {
        text: () => {
          // this method will be called
          // each time user press copy button
          this.setState({ copied: null });

          return this.props.link;
        }
      });

      clipboard.on('error', this.handleCopyError);
      clipboard.on('success', this.handleCopySuccess);

      this.clipboard = clipboard;
    }
  }

  renderLink(): React.Element<any> {
    const { link, pending } = this.props;
    if (pending) {
      return <Spinner type="dotted" />;
    }

    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    );
  }

  render(): React.Element<any> {
    const { pending } = this.props;
    const { copied } = this.state;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.block}>
          <div className={styles.link}>
            {this.renderLink()}
          </div>
          <Button
            wide
            theme={copied ? 'success' : 'primary'}
            disabled={pending}
            ref={this.handleButtonMount}
          >
            <Text id={`ActivityInvite.${copied ? 'copied' : 'copy'}`} />
          </Button>
        </div>
        <hr className={styles.hr} />
        <div className={styles.block}>
          <Button className={styles.revoke} theme="link" onClick={this.props.onRevoke}>
            <Text id="ActivityInvite.revoke" />
          </Button>
        </div>
      </div>
    );
  }
}

export default ActivityInvite;
