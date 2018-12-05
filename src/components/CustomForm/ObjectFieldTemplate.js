/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { JSONSchema } from '@dlghq/dialog-utils';
import React, { PureComponent, type Node } from 'react';
import Fieldset from '../Fieldset/Fieldset';
import styles from './CustomForm.css';

type Property = {
  name: string,
  content: Node,
  readonly: boolean,
  disabled: boolean,
  required: boolean,
};

type Props = {
  title?: ?string,
  uiSchema?: ?JSONSchema,
  description?: ?string,
  properties: Property[],
};

export default class ObjectFieldTemplate extends PureComponent<Props> {
  renderDescription() {
    if (!this.props.description) {
      return null;
    }

    return <div className={styles.description}>{this.props.description}</div>;
  }

  renderProperties(): Node {
    return this.props.properties.map((property: Property) => {
      if (this.props.uiSchema) {
        if (
          this.props.uiSchema[property.name] &&
          this.props.uiSchema[property.name]['ui:widget'] === 'hidden'
        ) {
          return null;
        }
      }

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
