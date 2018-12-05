```jsx
initialState = {
  big: null,
  small: null,
};

const handleImageChange = (size) => {
  setState({
    [size]: `https://picsum.photos/500/500/?${Math.floor(Math.random() * 20)}`,
  });
};

const handleImageRemove = (size) => {
  setState({ [size]: null });
};

<div>
  <div className="styleguide__buttons">
    <Button
      onClick={() => handleImageChange('big')}
      theme="primary"
      size="small"
    >
      Change big image
    </Button>
    <Button
      onClick={() => handleImageRemove('big')}
      theme="warning"
      size="small"
      disabled={!state.big}
    >
      Remove big image
    </Button>
    <br />
    <Button
      onClick={() => handleImageChange('small')}
      theme="primary"
      size="small"
    >
      Change small image
    </Button>
    <Button
      onClick={() => handleImageRemove('small')}
      theme="warning"
      size="small"
      disabled={!state.small}
    >
      Remove small image
    </Button>
  </div>
  <br />
  <AvatarDouble
    big={{
      title: 'Vladimir Vladimirovich',
      placeholder: 'red',
      image: state.big,
    }}
    small={{
      title: 'Hello World',
      placeholder: 'green',
      image: state.small,
    }}
    size={150}
    onClick={console.log}
  />
</div>;
```
