export const interactive = {
  type: 'interactive',
  content: [
    {
      title: 'Test',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere necessitatibus ullam, sed vel consectetur odit. Et, sit, quas. Ad optio facere eligendi corporis ratione repellendus consectetur sunt iusto, itaque nam?\n',
      actions: [
        {
          id: 'yes',
          style: 'primary',
          widget: {
            type: 'button',
            value: 'yes',
            label: 'Yes, shure'
          }
        }, {
          id: 'no',
          style: 'default',
          widget: {
            type: 'button',
            value: 'no',
            label: 'No, thanks'
          }
        }, {
          id: 'address',
          style: 'default',
          widget: {
            type: 'select',
            label: 'Select address',
            options: [{
              value: 'address_1_value',
              label: 'address_1_label'
            }, {
              value: 'address_2_value',
              label: 'address_3_label'
            }],
            defaultValue: 'address_1_value'
          }
        }
      ]
    }
  ]
};
