/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 */
/* eslint-disable */

import React, { PureComponent } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import MessageMediaInteractive from '../MessageMediaInteractive';
import 'codemirror/mode/javascript/javascript';
import { interactive } from '../../../fixtures/messagesMedia';
import styles from './MessageMediaInteractiveExample.css';
import './CodeMirror.css';

type Props = {};
type State = {
  code: string,
};

class MessageMediaInteractiveExample extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      code: JSON.stringify(interactive.content, null, 2),
    };
  }

  handleCodeChange = (
    editor: $FlowIssue,
    metadata: $FlowIssue,
    value: string,
  ): void => {
    this.setState({ code: value });
  };

  handleSubmit = (id: string, value: string): void => {
    alert(`Interactive action submit: ${id} => ${value}`);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.code}>
          <h3 className={styles.heading}>
            Enter your interactive message content as JSON
          </h3>
          <CodeMirror
            value={this.state.code}
            options={{
              mode: 'javascript',
              theme: 'dracula',
              lineNumbers: true,
            }}
            onBeforeChange={this.handleCodeChange}
          />
        </div>
        <div className={styles.result}>
          <h3 className={styles.heading}>Check result</h3>
          <MessageMediaInteractive
            media={{
              type: 'interactive',
              content: JSON.parse(this.state.code),
              messages: interactive.messages,
            }}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default MessageMediaInteractiveExample;
