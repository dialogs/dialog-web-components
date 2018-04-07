/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import Fieldset from '../Fieldset/Fieldset';
import styles from './CustomForm.css';

type Property = {
  name: string,
  content: Node
};

type Props = {
  title?: ?string,
  description?: ?string,
  properties: Property[]
};

export default class ObjectFieldTemplate extends PureComponent<Props> {
  renderDescription() {
    if (!this.props.description) {
      return null;
    }

    return (
      <div className={styles.description}>
        {this.props.description}
      </div>
    );
  }

  renderProperties() {
    return this.props.properties.map((property: Property) => {
      return (
        <div key={property.name} className={styles.field}>
          {property.content}
        </div>
      );
    });
  }

  render() {
    return (
      <Fieldset legend={this.props.title}>
        {this.renderDescription()}
        {this.renderProperties()}
      </Fieldset>
    );
  }
}
