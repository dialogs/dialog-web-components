Basic PreferencesModal:

```
const initialState = {
  isOpen: false,
  screen: 'general',
  preferences: {
    sendByEnter: false,
    isSoundEnabled: true
  }
};
const actions = {
  onScreenChange: (screen) => setState({ screen }),
  onChange: (preferences) => {
    setState({ preferences });
    console.debug(preferences);
  },
  onSubmit: (preferences) => {
    setState({ ...initialState });
    console.debug(preferences);
  }
};

<div>
  <Button onClick={() => setState({ isOpen: true })}>Open Preferences</Button>
  <PreferencesModal
    {...state}
    {...actions}
  />
</div>
```
