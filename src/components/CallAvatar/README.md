```jsx
initialState = {
  animated: false,
};

const toggleAnimation = () => setState({ animated: !state.animated });

<div>
  <Button theme="primary" size="small" onClick={toggleAnimation}>
    Toggle Animation
  </Button>
  <div style={{ textAlign: 'center' }}>
    <CallAvatar
      size={130}
      animated={state.animated}
      peer={{
        avatar: 'https://octodex.github.com/images/octotron.jpg',
        name: 'Spidertocat',
        peer: {
          id: 213123,
        },
      }}
    />
  </div>
</div>;
```
