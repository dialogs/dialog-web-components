/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
<% if (styles) { -%>
import classNames from 'classnames';
import styles from './<%= name %>.css';
<% } -%>

export type Props = {
<% if (styles) { -%>
  className?: string,
<% } -%>
  children?: mixed
};

class <%= name %> extends PureComponent {
  props: Props;

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
