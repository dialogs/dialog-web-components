```jsx
initialState = {
  isOpen: false
};

const onOpen = () => setState({ isOpen: true });
const onSubmit = () => setState({ isOpen: false });

<div>
  <Button theme="danger" size="small" onClick={onOpen}>Open alert</Button>
  {state.isOpen ? (
    <Alert
      message="Something went wrong!!!"
      submit="Okay"
      onSubmit={onSubmit}
    />
  ) : null}
</div>
```
