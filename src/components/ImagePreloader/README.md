```jsx
initialState = {
  image: null,
};

const handleImageChange = () => {
  setState({
    image: `https://picsum.photos/1500/1500/?${Math.floor(Math.random() * 20)}`,
  });
};

<div>
  <Button onClick={handleImageChange} theme="primary" size="small">
    Change image
  </Button>
  <hr />
  <ImagePreloader src={state.image} onChange={console.log}>
    {({ src }) => {
      return <img src={src} width={150} height={150} />;
    }}
  </ImagePreloader>
</div>;
```
