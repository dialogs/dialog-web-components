/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';
import styles from '../Modal/Modal.css';

export type Props = {
  className?: string,
  pending?: boolean,
  onClick: () => any
};

function ModalClose(props: Props): React.Element<any> {
  const className = classNames(styles.close, props.className);

  if (props.pending) {
    return (
      <Spinner className={className} />
    );
  }

  return (
    <Icon
      glyph="close"
      className={className}
      onClick={props.onClick}
    />
  );
}

export default ModalClose;
