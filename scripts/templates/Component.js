/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

<% if (stateless) { -%>
import React from 'react';
<% } else { -%>
import React, { Component } from 'react';
<% } -%>
<% if (styles) { -%>
import classNames from 'classnames';
import styles from './<%= name %>.css';
<% } -%>

export type Props = {
<% if (styles) { -%>
  className?: string,
<% } -%>
  children?: any
};

<% if (stateless) { -%>
function <%= name %>(props: Props): React.Element<any> {
<% if (styles) { -%>
  const className = classNames(styles.container, props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
<% } else { -%>
  return (
    <div>
      {props.children}
    </div>
  );
<% } -%>
}
<% } else { -%>
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
<% } -%>

export default <%= name %>;
