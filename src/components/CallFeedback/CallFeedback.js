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
import CallFeedbackRating from './CallFeedbackRating';
import styles from './CallFeedback.css';

type Feedback = {
  text: string,
  addLogs: boolean,
  rating: number
};

type Props = {
  id: string,
  className?: string,
  onSubmit: (feedback: Feedback) => any,
  onClose: () => any
};

type State = Feedback;

class CallFeedback extends PureComponent {
  props: Props;
  state: State;

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

  handleRatingChange = (rating: number): void => {
    this.setState({ rating });
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
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
            >
              <Text id="CallFeedback.add_logs" />
            </Switcher>
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button
              wide
              type="submit"
              theme="success"
              rounded={false}
            >
              <Text id="CallFeedback.submit" />
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default CallFeedback;
