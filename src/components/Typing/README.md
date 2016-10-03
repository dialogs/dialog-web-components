Basic Typing:

```
const initialState = {
  typing: null
}

function toggleTyping() {
  if (state.typing) {
    setState({ typing: null });
  } else {
    setState({ typing: 'Someone is typing' });
  }
};

<div>
  <button onClick={toggleTyping}>toggle</button>
  <br/>
  <Typing typing={state.typing} />
</div>
```
