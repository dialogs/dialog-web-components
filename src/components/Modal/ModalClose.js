/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';
import styles from './Modal.css';

export type Props = {
  className?: string,
  pending?: boolean,
  onClick: () => any
};

function ModalClose(props: Props): React.Element<any> {
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
      />
    </div>
  );
}

export default ModalClose;
