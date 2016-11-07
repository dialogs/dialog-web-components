Basic Archive:

```
function getArchives(offset = 0) {
  const archive = [];
  for (let i = 0; i < 10; i++) {
    const id = i + offset * 10;
    archive.push({
      counter: id % 123,
      peer: {
        peer: {
          id: id,
          type: 'user'
        },
        title: `User ${id}`,
        placeholder: 'blue',
        avatar: null
      }
    });
  };
  
  return archive;
}

initialState = {
  archive: getArchives(0),
  offset: 0,
  pending: false
};

const handleLoad = () => {
  if (state.offset < 5) {
    setState({ pending: true });
    setTimeout(() => {
      setState({
        archive: [
          ...state.archive, 
          ...getArchives(state.offset)
        ],
        offset: state.offset + 1,
        pending: false
      });
    }, 3000);
  }
};

const handleClose = () => {
  setState(initialState);
};

<div style={{
  width: 270,
  height: 500,
  background: '#f5f5f5',
  position: 'relative',
  overflow: 'hidden'
}}>
  <Archive 
    archive={state.archive}
    onOpen={handleLoad}
    onLoadMore={handleLoad}
    onClose={handleClose}
    pending={state.pending}
  />
</div>
```
