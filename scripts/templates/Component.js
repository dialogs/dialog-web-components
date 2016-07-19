/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
<% if (styles) { -%>
import classNames from 'classnames';
import styles from './<%= name %>.css';
<% } -%>

class <%= name %> extends Component {
  static propTypes = {
<% if (styles) { -%>
    className: PropTypes.string,
<% } -%>
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate(nextProps) {
<% if (styles) { -%>
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
<% } else { -%>
    return nextProps.children !== this.props.children;
<% } -%>
  }

  render() {
<% if (styles) { -%>
    const className = classNames(styles.root, this.props.className);

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
