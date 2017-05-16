```
initialState = {
  size: 130,
  animated: false,
  caller: {
    avatar: 'https://octodex.github.com/images/octotron.jpg',
    name: 'Spidertocat',
    placeholder: 'red'
  }
};

const toggleAnimation = () => setState({ animated: !state.animated });

<div>
  <Button theme="primary" size="small" onClick={toggleAnimation}>Toggle Animation</Button>
  <div style={{ textAlign: 'center'}}>
    <CallAvatar
      {...state}
    />
  </div>
</div>
```
