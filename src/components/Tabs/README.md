```
initialState = { current: 'profile' };
const handlePick = (current) => setState({ current });

<Tabs
  current={state.current}
  variants={[
    { id: 'profile', title: 'Profile' },
    { id: 'settings', title: 'Settings' },
    { id: 'help', title: 'Help' }
  ]}
  onPick={handlePick}
/>
```
