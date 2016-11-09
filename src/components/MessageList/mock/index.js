const text = require('./text.json');
const users = require('./users.json');

const time = (date) => date.toISOString().slice(11, 16);

module.exports = text.map((text, index) => {
  const date = new Date(Date.now() + index * 100);

  return {
    rid: String(index),
    date: time(date),
    fullDate: date,
    sender: users[index % users.length],
    content: {
      text,
      type: 'text'
    },
    reactions: [],
    state: 'unknown',
    sortKey: String(date.getTime() / 1000),
    sortDate: date.getTime() / 1000,
    isOut: true,
    isOnServer: true
  };
});

console.log(module.exports);
