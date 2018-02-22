```jsx
const schema = require('../../fixtures/cutomProfileSchema.json');
const uiSchema = {
  firstName: {
    'ui:placeholder': 'Choose an option'
  },
  bio: {
    'ui:widget': 'textarea'
  },
  password: {
    'ui:widget': 'password',
    'ui:description': 'The best password',
    'ui:help': 'Hint: Make it strong!'
  },
  done: {
    'ui:description': 'I read the license agreement and understood everything.'
  }
};
initialState = {
  value: {
    lastName: 'Rodgers 🦐',
    age: 97,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    telephone: '+1 234 567 89 00'
  }
};

const handleChange = (value) => setState({ value });

<div>
  <CustomForm id="custom" schema={schema} uiSchema={uiSchema} value={state.value} onChange={handleChange} />
  <hr />
  <pre>{JSON.stringify(state.value, null, 2)}</pre>
</div>
```
