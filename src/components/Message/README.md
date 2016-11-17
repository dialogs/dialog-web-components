Message:

```
const sender = {
  avatar: 'https://avatars1.githubusercontent.com/u/3505878',
  placeholder: 'red',
  title: 'Nikita',
  userName: 'gusnkt',
  peer: {
    id: 1643224499,
    type: 'user'
  }
};
const messages = [
  {
    sender,
    date: '20:30 pm',
    state: 'read',
    content: {
      type: 'text',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam, aspernatur dolor ea eum expedita labore modi nesciunt, numquam officia perferendis porro quidem quod rerum saepe sequi suscipit tempora voluptate?'
    }
  },
  {
    sender,
    date: '20:31 pm',
    state: 'sending',
    content: {
      type: 'text',
      text: 'Accusamus aperiam, aspernatur dolor ea eum expedita'
    }
  }
];

<div>
  <Message message={messages[0]} state={messages[0].state} />
  <Message message={messages[1]} state={messages[1].state} short />
</div>
```
