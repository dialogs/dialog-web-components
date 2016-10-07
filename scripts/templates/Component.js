/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
<% if (styles) { -%>
import classNames from 'classnames';
import styles from './<%= name %>.css';
<% } -%>

export type Props = {
<% if (styles) { -%>
  className?: string,
<% } -%>
  children: any
}

class <%= name %> extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
<% if (styles) { -%>
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
<% } else { -%>
    return nextProps.children !== this.props.children;
<% } -%>
  }

  render(): React.Element<any> {
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
