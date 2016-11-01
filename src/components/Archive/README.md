Basic Archive:

```
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let archive = [];
for (let i = 0; i < 10; i++) {
  const id = getRandomInt(100, 10000);
  archive.push({
    peer: {
      id: id,
      type: 'user'
    },
    title: `User ${id}`,
    placeholder: 'blue',
    avatar: null
  });
};

<div style={{
  width: 270,
  height: 500,
  background: '#f5f5f5',
  position: 'relative',
  overflow: 'hidden'
}}>
  <Archive archive={archive} />
</div>
```
