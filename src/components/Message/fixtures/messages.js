/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

/* eslint-disable */


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

module.exports = [
  {
    sender,
    date: '20:30',
    state: 'read',
    content: {
      type: 'text',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis ipsum viverra, eleifend ante nec, porta enim.'
    }
  },
  {
    sender,
    date: '20:30',
    state: 'error',
    content: {
      type: 'text',
      text: 'Quisque sollicitudin purus eget dui imperdiet, sed imperdiet dui mollis.'
    }
  },
  {
    sender,
    date: '20:31',
    state: 'pending',
    content: {
      type: 'text',
      text: 'Donec iaculis augue eu blandit scelerisque.'
    }
  },
  {
    sender,
    date: '20:31',
    state: 'sent',
    content: {
      type: 'text',
      text: 'Quisque cursus non lectus id congue. Nam accumsan faucibus ex eget tempor.'
    }
  },
  {
    sender,
    date: '20:32',
    state: 'received',
    content: {
      type: 'text',
      text: 'Suspendisse sodales purus tellus, non sollicitudin dolor consectetur vel. Sed non facilisis ex. Pellentesque eu urna ac quam eleifend tristique ut at est. Aliquam condimentum nec quam congue imperdiet.'
    }
  }
];
