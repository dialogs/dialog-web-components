/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { Component, type Node } from 'react';
import { listen } from '@dlghq/dialog-utils';
import createKeyHotKey from 'key-event-to-string';

type Props = {
  children: Node,
  onHotKey: (trigger: string, event: KeyboardEvent) => mixed
};

class HotKeys extends Component<Props> {
  listener: ?{ remove(): void };
  getHotKey: (event: KeyboardEvent) => string;

  constructor(props: Props) {
    super(props);

    this.getHotKey = createKeyHotKey();
  }

  componentDidMount(): void {
    this.listener = listen(window, 'keydown', this.handleKeyDown, { capture: true });
  }

  componentWillUnmount(): void {
    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }
  }

  handleKeyDown = (event: KeyboardEvent): void => {
    this.props.onHotKey(this.getHotKey(event), event);
  };

  render() {
    return this.props.children;
  }
}

export default HotKeys;
