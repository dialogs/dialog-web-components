import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Switcher.css';
import getRandomString from '../../utils/getRandomString';

class Switcher extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: false
  };

  render() {
    const { id, value, onChange, disabled } = this.props;
    const className = classNames(styles.root, this.props.className, {
      [styles.checked]: value,
      [styles.disabled]: disabled
    });

    return (
      <div className={className}>
        <input
          className={styles.input}
          value={value}
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
