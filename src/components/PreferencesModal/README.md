```
initialState = {
  isOpen: false,
  screen: 'general',
  settings: {
    value: null,
    error: null,
    pending: true
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
  onSettingsLoad() {
    setState({
      settings: {
        ...state.settings,
        pending: true
      }
    });

    setTimeout(() => {
      setState({
        settings: {
          value: {
            isSendByEnter: true,
            isSoundEffectsEnabled: false,
            isOnlyMentionNotifications: true,
            isGroupsNotificationsEnabled: false,
            isShowNotificationsTextEnabled: true
          },
          error: null,
          pending: false
        }
      });
    }, 1000);
  },
  onSettingsChange(value) {
    setState({
      settings: {
        ...state.settings,
        pending: true
      }
    });

    setTimeout(() => {
      setState({
        settings: {
          ...state.settings,
          value,
          pending: false
        }
      });
    }, 500);
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
