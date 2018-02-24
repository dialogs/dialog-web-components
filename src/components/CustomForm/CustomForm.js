/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { JSONValue, JSONSchema } from '@dlghq/dialog-utils';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import Form from 'react-jsonschema-form';
import TextWidget from './widgets/TextWidget';
import PasswordWidget from './widgets/PasswordWidget';
import TextareaWidget from './widgets/TextareaWidget';
import CheckboxWidget from './widgets/CheckboxWidget';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import styles from './CustomForm.css';

export type Props = {
  className?: string,
  id: string,
  name: string,
  liveValidate: boolean,
  value: ?JSONValue,
  schema: JSONSchema,
  uiSchema?: ?JSONSchema,
  onChange: (value: JSONValue) => mixed
};

class CustomForm extends PureComponent<Props> {
  widgets: Object;

  static defaultProps = {
    liveValidate: true
  };

  constructor(props: Props) {
    super(props);

    this.widgets = {
      TextWidget,
      PasswordWidget,
      TextareaWidget,
      CheckboxWidget
    };
  }

  handleChange = (value: { formData: JSONValue }) => {
    this.props.onChange(value.formData);
  };

  getCustomFieldTemplate = (field: { children: Node }): Node => field.children;

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Form
          liveValidate={this.props.liveValidate}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          formData={this.props.value}
          widgets={this.widgets}
          id={this.props.id}
          name={this.props.name}
          onChange={this.handleChange}
          ObjectFieldTemplate={ObjectFieldTemplate}
          FieldTemplate={this.getCustomFieldTemplate}
          showErrorList={false}
        >
          <span />
        </Form>
      </div>
    );
  }
}

export default CustomForm;
