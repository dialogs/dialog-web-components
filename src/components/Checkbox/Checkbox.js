import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Checkbox.css';

class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    label: PropTypes.node,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    checked: false
  };

  render() {
    const { id, checked, label, disabled, onChange } = this.props;
    const className = classNames(styles.root, this.props.className, {
      [styles.checked]: checked,
      [styles.disabled]: disabled
    });

    return (
      <div className={className}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
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
