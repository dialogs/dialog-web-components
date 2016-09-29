Basic ActivityNotifications:

```
const initialState = { isEnabled: true };

<div style={{ background: '#fff', width: 320 }}>
  <ActivityNotification
    value={state.isEnabled}
    onChange={(isEnabled) => setState({ isEnabled })}
  />
</div>
```
