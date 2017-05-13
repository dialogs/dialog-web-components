/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Text } from '@dlghq/react-l10n';
import Clipboard from 'clipboard';
import Button from '../Button/Button';

type Props = {
  text: string,
  wide: ?boolean,
  disabled: boolean
};

type State = {
  copied: ?boolean
};

class CopyButton extends Component {
  props: Props;
  state: State;
  button: ?Node;
  clipboard: ?Clipboard;
  timeout: ?number;

  constructor(props: Props) {
    super(props);

    this.state = {
      copied: null
    };
  }

  componentDidMount(): void {
    if (this.button) {
      const clipboard = new Clipboard(this.button, {
        text: () => {
          // this method will be called
          // each time user press copy button
          this.setState({ copied: null });

          return this.props.text;
        }
      });

      clipboard.on('error', this.handleCopyError);
      clipboard.on('success', this.handleCopySuccess);

      this.clipboard = clipboard;
    }
  }

  componentWillReceiveProps(): void {
    // force clear copied state
    this.setState({ copied: null });
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  componentWillUnmount(): void {
    if (this.clipboard) {
      this.clipboard.destroy();
      this.clipboard = null;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  handleCopyError = (): void => {
    this.setState({ copied: false });
  }

  handleCopySuccess = (event?: $FlowIssue): void => {
    this.setState({ copied: true });
    if (event) {
      event.clearSelection();
    }

    this.timeout = setTimeout(() => this.setState({ copied: null }), 3000);
  }

  setButton = (button: ?Button): void => {
    this.button = findDOMNode(button);
  };

  render(): React.Element<any> {
    const { copied } = this.state;

    return (
      <Button
        ref={this.setButton}
        wide={Boolean(this.props.wide)}
        disabled={this.props.disabled}
        theme={copied ? 'success' : 'primary'}
      >
        <Text id={`CopyButton.${copied ? 'copied' : 'copy'}`} />
      </Button>
    );
  }
}

export default CopyButton;
