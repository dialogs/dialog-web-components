```jsx
const schema = JSON.stringify(require('../../fixtures/cutomProfileSchema.json'));
const value = JSON.stringify({
  lastName: 'Rodgers 🦐',
  age: 97,
  bio: 'Roundhouse kicking asses since 1940',
  password: 'noneed',
  done: true,
  telephone: '+1 234 567 89 00'
});

<CustomProfile schema={schema} value={value} />;
```
