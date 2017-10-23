/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaInteractive } from '@dlghq/dialog-types';

export const interactive: MessageMediaInteractive = {
  type: 'interactive',
  content: [
    {
      title: 'Test',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Facere necessitatibus ullam, sed vel consectetur odit.
Et, sit, quas. Ad optio facere eligendi corporis ratione repellendus consectetur sunt iusto, itaque nam?`,
      actions: [
        {
          id: 'yes',
          style: 'primary',
          widget: {
            type: 'button',
            value: 'yes',
            label: 'Yes, sure'
          }
        },
        {
          id: 'no',
          style: 'default',
          widget: {
            type: 'button',
            value: 'no',
            label: 'No, thanks'
          }
        },
        {
          id: 'address',
          style: 'primary',
          widget: {
            type: 'select',
            label: 'Select address',
            options: [
              {
                value: 'address_1_value',
                label: 'address_1_label'
              },
              {
                value: 'address_2_value',
                label: 'address_3_label'
              }
            ],
            defaultValue: 'address_1_value'
          }
        }
      ]
    }
  ]
};
