/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';
import styles from './Modal.css';

export type Props = {
  className?: string,
  pending?: boolean,
  id?: string,
  onClick: () => mixed
};

function ModalClose(props: Props) {
  const className = classNames(styles.closeContainer, props.className);

  if (props.pending) {
    return (
      <div className={className}>
        <Spinner type="round" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Icon
        glyph="close"
        className={styles.close}
        onClick={props.onClick}
        id={props.id}
      />
    </div>
  );
}

export default ModalClose;
