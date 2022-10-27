Basic ContextMenu:

```
const onClick = () => alert('!!!');
const getMenu = () => {
  return ([{
    title: 'Menu item',
    handler: onClick
  }]);
};
<ContextMenu getMenu={getMenu}>
  Hello from ContextMenu!
</ContextMenu>
```
