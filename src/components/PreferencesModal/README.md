Basic PreferencesModal:

```
initialState = {
  isOpen: false,
  screen: 'general',
  preferences: {
    sendByEnter: false,
    isSoundEnabled: true,
    privateNotifications: true,
    privateMessagePreview: false,
    groupNotifications: false,
    groupMessagePreview: false,
    groupOnlyMentions: true
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
  {
    state.isOpen ? (
      <PreferencesModal
        {...state}
        {...actions}
      />
    ) : null
  }
</div>
```
