import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Switcher.css';

class Switcher extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    checked: false
  };

  render() {
    const { id, checked, onChange, disabled } = this.props;
    const className = classNames(styles.root, this.props.className, {
      [styles.checked]: checked,
      [styles.disabled]: disabled
    });

    return (
      <div className={className}>
        <input
          className={styles.input}
          checked={checked}
          id={id}
          onChange={onChange}
          type="checkbox"
        />
        <label htmlFor={id} className={styles.label} />
      </div>
    );
  }
}

export default Switcher;
