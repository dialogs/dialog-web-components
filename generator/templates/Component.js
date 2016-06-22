import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
<% if (styles) { -%>
import styles from './<%= name %>.css'
<% } -%>

class <%= name %> extends Component {
  static propTypes = {
<% if (styles) { -%>
    className: PropTypes.string,
<% } -%>
    children: PropTypes.node.isRequired
  };

  render() {
<% if (styles) { -%>
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
<% } else { -%>
    return (
      <div>
        {this.props.children}
      </div>
    );
<% } -%>
  }
}

export default <%= name %>;
