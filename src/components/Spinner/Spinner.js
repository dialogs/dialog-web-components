import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Spinner.css';

class Spinner extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['round', 'wave', 'dotted']).isRequired,
    size: PropTypes.oneOf(['normal', 'large']).isRequired,
  };

  static defaultProps = {
    type: 'round',
    size: 'normal'
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className ||
           nextProps.type!== this.props.type;
  }

  renderWaveSpinner() {
    const { size, className } = this.props;
    const waveClassName = classNames(styles.wave, styles[size], className);

    return (
      <div className={waveClassName}>
        <div className={styles.stick} />
        <div className={styles.stick} />
        <div className={styles.stick} />
        <div className={styles.stick} />
        <div className={styles.stick} />
      </div>
    );
  }

  renderRoundSpinner() {
    const { size, className } = this.props;
    const roundClassName = classNames(styles.round, styles[size], className);

    return (
      <div className={roundClassName} />
    );
  }

  renderDottedSpinner() {
    const { size, className } = this.props;
    const dottedClassName = classNames(styles.dotted, styles[size], className);

    return (
      <div className={dottedClassName}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    );
  }

  render() {
    const { type } = this.props;

    switch (type) {
      case 'wave':
        return this.renderWaveSpinner();
      case 'round':
        return this.renderRoundSpinner();
      case 'dotted':
        return this.renderDottedSpinner();
      default:
        return null;
    }
  }
}

export default Spinner;
