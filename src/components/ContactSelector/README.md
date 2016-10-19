Basic ContactSelector:

```
initialState = {
  selected: [],
  contacts: [{
    avatar: 'https://avatars0.githubusercontent.com/u/930121',
    name: 'Oleg',
    placeholder: 'red',
    uid: 930121
  }, {
    avatar: 'https://avatars0.githubusercontent.com/u/3505878',
    name: 'Nikita',
    about: 'Front end developer',
    placeholder: 'purple',
    uid: 3505878
  }]
};

const actions = {
  onSelect: (id) => {
    const selected = state.selected; 
    if (state.selected.indexOf(id) === -1) {
      setState({
        selected: [...selected, id]
      });
    } else {
      setState({
        selected: selected.filter((_id) => _id !== id)
      })
    }
  }
};

<div style={{ width: 500, background: 'white'}}>
  <ContactSelector
    {...state}
    {...actions}
  />
</div>
```
