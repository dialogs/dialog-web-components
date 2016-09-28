Basic ActivityNotifications:

```
const initialState = { isEnabled: true };

<div style={{ background: '#fff', width: 320 }}>
  <ActivityNotification
    isEnabled={state.isEnabled}
    onChange={() => setState({ isEnabled: !state.isEnabled })}
  />
</div>
```
