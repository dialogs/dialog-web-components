import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Switcher.css';

class Switcher extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: false,
    disabled: false
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value ||
           nextProps.disabled !== this.props.disabled ||
           nextProps.id !== this.props.id ||
           nextProps.className !== this.props.className;
  }

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
          checked={value}
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
