Basic ActivityNotifications:

```
const initialState = { isEnabled: true };
const onChange = (event) => setState({ isEnabled: !state.isEnabled });

<ActivityNotification isEnabled={state.isEnabled} onChange={onChange} />
```
