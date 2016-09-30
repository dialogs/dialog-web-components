/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Spinner from '../../Spinner/Spinner';
import styles from './Voice.css';

export type VoiceTranscriptionProps = {
  transcription: ?string,
  className?: string
};

function VoiceTranscription(props: VoiceTranscriptionProps) {
  const className = classNames(styles.transcription, {
    [styles.transcriptionEmpty]: props.transcription
  }, props.className);

  return (
    <div className={className}>
      {props.transcription ? props.transcription : <Spinner />}
    </div>
  );
}


export default VoiceTranscription;
