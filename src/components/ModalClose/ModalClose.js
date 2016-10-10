/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from '../Modal/Modal.css';

export type Props = {
  className?: string,
  onClick: () => any
};

function ModalClose(props: Props): React.Element<any> {
  const className = classNames(styles.close, props.className);

  return (
    <Icon
      glyph="close"
      className={className}
      onClick={props.onClick}
    />
  );
}

export default ModalClose;
