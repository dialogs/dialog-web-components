```jsx
initialState = { current: 'profile' };
const handlePick = (current) => setState({ current });

<SpaceList
  current={state.current}
  variants={[
    {
      id: '1',
      title: 'Gandalf the Grey',
      image: 'https://picsum.photos/200/200/?1',
    },
    {
      id: '2',
      title: 'Saruman White',
      image: 'https://picsum.photos/200/200/?2',
    },
    {
      id: '3',
      title: 'Gandalf the White',
    },
  ]}
  onPick={handlePick}
  onClick={() => alert('clicked')}
/>;
```

SpaceList with scrollable area:

```jsx
initialState = { current: 'profile' };
const handlePick = (current) => setState({ current });

<SpaceList
  current={state.current}
  variants={[
    {
      id: '1',
      title: 'Gandalf the Grey',
      image: 'https://picsum.photos/200/200/?1',
    },
    {
      id: '2',
      title: 'Saruman White',
      image: 'https://picsum.photos/200/200/?2',
    },
    {
      id: '3',
      title: 'Gandalf the White',
      placeholder: 'lblue',
    },
    {
      id: '4',
      title: 'Saruman White',
      image: 'https://picsum.photos/200/200/?3',
    },
    {
      id: '5',
      title: 'Worst wizard',
      placeholder: 'blue',
    },
    {
      id: '6',
      title: 'Gandalf the White',
      placeholder: 'lblue',
    },
    {
      id: '7',
      title: 'Saruman White',
      image: 'https://picsum.photos/200/200/?3',
    },
    {
      id: '8',
      title: 'Worst wizard',
      placeholder: 'blue',
    },
    {
      id: '9',
      title: 'Gandalf the White',
      placeholder: 'lblue',
    },
    {
      id: '0',
      title: 'Saruman White',
      image: 'https://picsum.photos/200/200/?3',
    },
  ]}
  onPick={handlePick}
  onClick={() => alert('clicked')}
/>;
```
