/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { JSONSchema, JSONValue } from '@dlghq/dialog-utils';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import memoize from 'lodash/memoize';
import { safelyParseJSON, safelyParseJSONSchema } from '@dlghq/dialog-utils';
import styles from './CustomProfile.css';
import CustomProfileProperty from './CustomProfileProperty';
import { orderProperties } from 'react-jsonschema-form/lib/utils';
const parseJSON = memoize(safelyParseJSON);
const parseJSONSchema = memoize(safelyParseJSONSchema);

export type Props = {
  className?: string,
  value: string,
  schema: string,
  uiSchema?: ?Object
};

class CustomProfile extends PureComponent<Props> {
  getValue(): JSONValue {
    return parseJSON(this.props.value);
  }

  getSchema(): JSONSchema {
    return parseJSONSchema(this.props.schema, (error) => console.error(error));
  }

  getUiSchema(): ?Object {
    if (!this.props.uiSchema) {
      return null;
    }

    return this.props.uiSchema;
  }

  renderProperties(): ?Array<Node> {
    const value = this.getValue();
    const schema = this.getSchema();
    const uiSchema = this.getUiSchema();

    if (!schema) {
      return null;
    }

    const properties =
      uiSchema && uiSchema['ui:order']
        ? orderProperties(Object.keys(schema.properties), uiSchema['ui:order'])
        : Object.keys(schema.properties);

    return properties.map((propName) => {
      const propValue = value && value[propName] ? value[propName] : null;
      const { type, title } = schema.properties[propName];

      // Do not render property if no value presented
      if (!propValue || typeof propValue === 'undefined' || propValue === '') {
        return null;
      }

      return <CustomProfileProperty key={propName} value={propValue} type={type} title={title} />;
    });
  }

  render() {
    if (!this.getValue()) {
      return null;
    }

    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderProperties()}
      </div>
    );
  }
}

export default CustomProfile;
