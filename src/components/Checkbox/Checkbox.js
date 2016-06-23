import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Checkbox.css';
import getRandomString from '../../utils/getRandomString';

class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    label: PropTypes.node,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    id: getRandomString(10),
    value: false,
  };

  render() {
    const { id, value, label, onChange, disabled } = this.props;
    const className = classNames(styles.root, this.props.className, {
      [styles.checked]: value,
      [styles.disabled]: disabled
    });

    return (
      <div className={className}>
        <input
          type="checkbox"
          id={id}
          checked={value}
          onChange={onChange}
          className={styles.checkbox}
        />

        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
