```
initialState = {
  isOpen: false,
  screen: 'general',
  settings: {
    isSendByEnter: true,
    isCounterIncludeMuted: true,
    isSoundEffectsEnabled: false,
    isOnlyMentionNotifications: true,
    isGroupsNotificationsEnabled: false,
    isShowNotificationsTextEnabled: true
  },
  sessions: {
    value: null,
    error: null,
    pending: true
  },
  blocked: {
    value: null,
    error: null,
    pending: true
  }
};

const actions = {
  onClose() {
    setState({ isOpen: false })
  },
  onScreenChange(screen) {
    setState({ screen });
  },
  onSettingsChange(settings) {
    setState({ settings });
  },
  onSessionsLoad() {

  },
  onSessionTerminate() {

  },
  onAllSessionsTerminate() {

  },
  onBlockedLoad() {

  },
};

<div>
  <Button theme="primary" onClick={() => setState({ isOpen: true })}>
    Open Preferences
  </Button>
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
