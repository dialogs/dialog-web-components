/*
 * Copyright 2018 dialog LLC <info@dlg.im>
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
import CallFeedbackRating from './CallFeedbackRating';
import styles from './CallFeedback.css';
import HotKeys from '../HotKeys/HotKeys';

type Feedback = {
  text: string,
  addLogs: boolean,
  rating: number
};

type Props = {
  id: string,
  className?: string,
  onSubmit: (feedback: Feedback) => mixed,
  onClose: () => mixed
};

type State = Feedback;

class CallFeedback extends PureComponent<Props, State> {
  static defaultProps = {
    id: 'call_feedback_modal'
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      text: '',
      addLogs: true,
      rating: 0
    };
  }

  handleSubmit = (event: ?SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }

    this.props.onSubmit(this.state);
  };

  handleFeedbackChange = (text: string): void => {
    this.setState({ text });
  };

  handleAddLogsToggle = (addLogs: boolean): void => {
    this.setState({ addLogs });
  };

  handleRatingChange = (rating: number): void => {
    this.setState({ rating });
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      this.handleSubmit();
    }
  };


  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.props.onClose}>
          <form id={this.props.id} autoComplete="off" onSubmit={this.handleSubmit}>
            <ModalHeader withBorder>
              <Text id="CallFeedback.title" />
              <ModalClose onClick={this.props.onClose} />
            </ModalHeader>
            <ModalBody className={styles.body}>
              <CallFeedbackRating
                onChange={this.handleRatingChange}
                value={this.state.rating}
                id={this.props.id + '_rating'}
                maxRating={5}
              />
              <InputNext
                htmlAutoFocus
                id={this.props.id + '_text'}
                type="textarea"
                placeholder="CallFeedback.label"
                inputClassName={styles.text}
                value={this.state.text}
                onChange={this.handleFeedbackChange}
              />
              <Switcher
                id={this.props.id + '_add_logs'}
                name="addLogs"
                value={this.state.addLogs}
                onChange={this.handleAddLogsToggle}
                label="CallFeedback.add_logs"
              />
            </ModalBody>
            <ModalFooter className={styles.footer}>
              <Button
                wide type="submit" theme="success" rounded={false}
                id="call_feedback_submit_button"
              >
                <Text id="CallFeedback.submit" />
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </HotKeys>
    );
  }
}

export default CallFeedback;
