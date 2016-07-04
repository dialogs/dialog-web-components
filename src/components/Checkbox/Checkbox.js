import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Checkbox.css';

class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.node,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: false,
    disabled: false
  };

  render() {
    const { id, value, label, disabled, onChange } = this.props;
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
