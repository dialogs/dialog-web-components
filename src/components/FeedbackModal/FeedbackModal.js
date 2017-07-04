/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalClose from '../Modal/ModalClose';
import InputNext from '../InputNext/InputNext';
import Switcher from '../Switcher/Switcher';
import Button from '../Button/Button';
import styles from './FeedbackModal.css';

type Feedback = {
  text: string,
  addLogs: boolean
};

type Props = {
  id: string,
  className?: string,
  onSubmit: (feedback: Feedback) => any,
  onClose: () => any
};

type State = Feedback

class FeedbackModal extends PureComponent {
  props: Props;
  state: State;

  static defaultProps = {
    id: 'feedback_modal'
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      text: '',
      addLogs: true
    };
  }

  handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleFeedbackChange = (text: string): void => {
    this.setState({ text });
  };

  handleAddLogsToggle = (addLogs: boolean): void => {
    this.setState({ addLogs });
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <form id={this.props.id} autoComplete="off" onSubmit={this.handleSubmit}>
          <ModalHeader withBorder>
            <Text id="FeedbackModal.title" />
            <ModalClose onClick={this.props.onClose} />
          </ModalHeader>
          <ModalBody className={styles.body}>
            <InputNext
              htmlAutoFocus
              id={this.props.id + '_text'}
              type="textarea"
              placeholder="FeedbackModal.label"
              inputClassName={styles.text}
              value={this.state.text}
              onChange={this.handleFeedbackChange}
            />
            <Switcher
              id={this.props.id + '_add_logs'}
              name="addLogs"
              value={this.state.addLogs}
              onChange={this.handleAddLogsToggle}
            >
              <Text id="FeedbackModal.add_logs" />
            </Switcher>
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button
              wide
              type="submit"
              theme="success"
              rounded={false}
            >
              <Text id="FeedbackModal.submit" />
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default FeedbackModal;
