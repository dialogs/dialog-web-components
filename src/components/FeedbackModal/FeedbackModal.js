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

export type Props = {
  className?: string,
  onSubmit: (feedback: Feedback) => any,
  onClose: () => any
};

type State = Feedback

class FeedbackModal extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      text: '',
      addLogs: true
    };
  }

  handleSubmit = (): void => {
    this.props.onSubmit(this.state);
  }

  handleFeedbackChange = (value: string): void => {
    this.setState({ text: value });
  };

  handleAddLogsToggle = (value: string): void => {
    this.setState({ addLogs: value });
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalHeader withBorder>
          <Text id="FeedbackModal.title" />
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <InputNext
            autoFocus
            type="textarea"
            placeholder="FeedbackModal.label"
            inputClassName={styles.text}
            value={this.state.text}
            onChange={this.handleFeedbackChange}
          />
          <Switcher
            id="addLogs"
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
            theme="success"
            rounded={false}
            onClick={this.handleSubmit}
          >
            <Text id="FeedbackModal.submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

}

export default FeedbackModal;
