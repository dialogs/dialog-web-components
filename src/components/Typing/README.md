```jsx
const initialState = {
  typing: null
};

function toggleTyping() {
  if (state.typing) {
    setState({ typing: null });
  } else {
    setState({
      typing: {
        typing: 'Someone is typing'
      }
    });
  }
}

<div>
  <Button theme="primary" onClick={toggleTyping} size="small">toggle</Button>
  <br />
  <Typing typing={state.typing} />
</div>
```
