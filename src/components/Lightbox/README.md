Basic Lightbox:

```
initialState = {
  isOpen: false,
  index: 0,
  items: [{
    src: 'https://s3.amazonaws.com/psiu/wallpapers/ESP_017348_1910/ESP_017348_1910_desktop.jpg',
    w: 2560,
    h: 1440
  },{
    src: 'https://s3.amazonaws.com/psiu/wallpapers/ESP_034234_1255/ESP_034234_1255_desktop.jpg',
    w: 2560,
    h: 1440
  },{
    src: 'https://s3.amazonaws.com/psiu/wallpapers/ESP_022405_1910/ESP_022405_1910_desktop.jpg',
    w: 2560,
    h: 1440
  }]
};
const handleClose = () => {
  console.debug('handleClose');
  setState({ isOpen: false })
};

<div>
  {
    state.items.map((image, index) => {
      return (
        <img
          key={index}
          src={image.src}
          style={{ width: 200, margin: 10 }}
          onClick={() => {setState({ isOpen: true, index })}}
        />
      );
    })
  }
  <Lightbox
    {...state}
    onClose={handleClose}
  />
</div>
```
