/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import VoicePlayer from './VoicePlayer';
import TransctiptButton from './TranscriptButton';
import VoiceTranscription from './VoiceTranscription';
import Spinner from '../../Spinner/Spinner';
import styles from './Voice.css';

export type Props = {
  className?: string,
  duration: number,
  fileUrl: ?string,
  // fileName: ?string,
  // fileSize: ?string,
  // fileExtension: ?string,
  isUploading: boolean,
  transcription?: ?string,
  getTranscription?: () => void,
  isTranscriptionEnabled: boolean
};

export type State = {
  isTranscriptionVisible: boolean
};

class Voice extends PureComponent {
  props: Props;
  state: State;

  static defaultProps = {
    isTranscriptionEnabled: false
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isTranscriptionVisible: false
    };
  }

  handleToggleTranscription = (): void => {
    const { transcription, getTranscription } = this.props;
    const { isTranscriptionVisible } = this.state;

    if (getTranscription && !transcription) {
      getTranscription();
    }

    this.setState({ isTranscriptionVisible: !isTranscriptionVisible });
  };

  renderTrancsriptButton() {
    const { isTranscriptionEnabled } = this.props;
    const { isTranscriptionVisible } = this.state;

    if (!isTranscriptionEnabled) {
      return null;
    }

    const className = classNames(styles.transctiptButton, {
      [styles.transctiptButtonActive]: isTranscriptionVisible
    });

    return (
      <TransctiptButton
        onClick={this.handleToggleTranscription}
        className={className}
      />
    );
  }

  renderMessage(): React.Element<any> {
    const { isUploading } = this.props;
    const className = classNames(styles.container, {
      [styles.uploading]: isUploading
    }, this.props.className);

    return (
      <div className={className}>
        <VoicePlayer
          isUploading={isUploading}
          fileUrl={this.props.fileUrl}
          duration={this.props.duration}
        />
        {
          isUploading
            ? <Spinner className={styles.spinner} size="large" />
            : null
        }
        {this.renderTrancsriptButton()}
      </div>
    );
  }

  renderTranscription(): ?React.Element<any> {
    const { transcription } = this.props;
    const { isTranscriptionVisible } = this.state;

    if (!isTranscriptionVisible) {
      return null;
    }

    return (
      <VoiceTranscription transcription={transcription} />
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderMessage()}
        {this.renderTranscription()}
      </div>
    );
  }
}

export default Voice;
