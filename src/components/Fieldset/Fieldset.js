import React, { Component, PropTypes } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Fieldset.css';

class Fieldset extends Component {
  static propTypes = {
    className: PropTypes.string,
    legend: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.legend !== this.props.legend ||
           nextProps.className !== this.props.className;
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <fieldset className={className}>
        <Text id={this.props.legend} className={styles.legend} tagName="legend" />
        {this.props.children}
      </fieldset>
    );
  }
}

export default Fieldset;
