/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */
/* eslint-disable */

import type { MessageMediaInteractive } from '@dlghq/dialog-types';

export const interactive: MessageMediaInteractive = {
  type: 'interactive',
  content: [
    {
      title: 'InteractiveMessage.title',
      description: 'InteractiveMessage.description',
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
                label: 'InteractiveMessage.select.label1'
              },
              {
                value: 'address_2_value',
                label: 'InteractiveMessage.select.label2'
              }
            ]
          }
        }
      ]
    }
  ],
  messages: {
    en: {
      'InteractiveMessage.title': 'This is interactive media title on english',
      'InteractiveMessage.description':
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\nFacere necessitatibus ullam, sed vel consectetur odit.\nEt, sit, quas. Ad optio facere eligendi corporis ratione repellendus consectetur sunt iusto, itaque nam?',
      'InteractiveMessage.select.label1': 'Interactive message label 1',
      'InteractiveMessage.select.label2': 'Interactive message label 2'
    },
    ru: {
      'InteractiveMessage.title': 'Это заголовок интерактивного сообщения на русском',
      'InteractiveMessage.description':
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\nFacere necessitatibus ullam, sed vel consectetur odit.\nEt, sit, quas. Ad optio facere eligendi corporis ratione repellendus consectetur sunt iusto, itaque nam?',
      'InteractiveMessage.select.label1': 'Лейбл интерактивного сообщения 1',
      'InteractiveMessage.select.label2': 'Лейбл интерактивного сообщения 2'
    }
  }
};
