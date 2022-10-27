Basic ActivityListNotification:

```
const initialState = { isEnabled: true };

<div style={{ background: '#fff', width: 320 }}>
  <ActivityListNotification
    value={state.isEnabled}
    onChange={(isEnabled) => setState({ isEnabled })}
  />
</div>
```
