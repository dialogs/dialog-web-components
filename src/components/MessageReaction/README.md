Message Reaction
----------------

```
const _ = require('lodash');
const { Map } = require('immutable');

const uid = 3;

const users = new Map([
  [1, {
    peer: { id: 1, type: 'user' },
    type: 'user',
    title: 'Nikita Gusakov',
    userName: 'nkt',
    avatar: null,
    bigAvatar: null,
    placeholder: 'red'
  }],
  [2, {
    peer: { id: 2, type: 'user' },
    type: 'user',
    title: 'Oleg Shilov',
    userName: null,
    avatar: null,
    bigAvatar: null,
    placeholder: 'green'
  }]
]);

initialState = {
  reactions: [
    { uids: [1, 2], count: 2, code: '😀', isOwnSet: false },
    { uids: [1, 2], count: 3, code: '🤣', isOwnSet: true },
    { uids: [1], count: 1, code: '🔑', isOwnSet: false }
  ]
};

const handleToggle = (char) => {
  setState({
    reactions: state.reactions.map((reaction) => {
      if (reaction.code === char) {
        const idx = reaction.uids.indexOf(uid);
        return {
          ...reaction,
          isOwnSet: !reaction.isOwnSet,
          count: reaction.count + (reaction.isOwnSet ? -1 : +1)
        };
      }

      return reaction;
    })
  });
};

<div>
  {state.reactions.map((reaction) => {
    return (
      <MessageReaction
        key={reaction.code}
        users={users}
        reaction={reaction}
        onToggle={handleToggle}
      />
    );
  })}
</div>
```
