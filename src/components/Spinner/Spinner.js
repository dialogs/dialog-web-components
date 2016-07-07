import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Spinner.css';

class Spinner extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  shouldComponentUpdate(prevProps) {
    return prevProps.className !== this.props.className;
  }

  render() {
    const className = classNames(styles.root, this.props.className);

    return (
      <div className={className}>
        <div /><div /><div /><div /><div />
      </div>
    );
  }
}

export default Spinner;
