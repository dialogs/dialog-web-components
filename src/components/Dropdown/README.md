```jsx
const { Dropdown, DropdownItem, DropdownDivider, PeerAvatar } = require('../../index');
const handleClick = () => alert('menu clicked');

const user = {
  title: 'Someone',
  placeholder: 'green',
  avatar: null,
  peer: {
    id: 4412
  }
};

<Dropdown>
  <DropdownItem>
    <PeerAvatar peer={user} size={32} />
    <b style={{ marginLeft: 8 }}>{user.title}</b>
  </DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem onClick={handleClick} active>
    Very very very very loooong menu item
  </DropdownItem>
  <DropdownItem onClick={handleClick}>Last menu item</DropdownItem>
</Dropdown>
```

Dropdown with Divider:

```jsx
const { Dropdown, DropdownItem, DropdownDivider } = require('../../index');
const handleClick = () => alert('menu clicked');

<Dropdown>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```

Dropdown with Header:

```jsx
const { Dropdown, DropdownItem, DropdownHeader } = require('../../index');
const handleClick = () => alert('menu clicked');

<Dropdown>
  <DropdownHeader>Hello there</DropdownHeader>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownHeader>There is another one heading</DropdownHeader>
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```

Dropdown with submenu:

```jsx
const { Dropdown, DropdownItem } = require('../../index');
const handleClick = () => alert('menu clicked');
const renderSubmenu = () => {
  return (
    <Dropdown submenu>
      <DropdownItem onClick={handleClick}>Submenu first menu item</DropdownItem>
      <DropdownItem onClick={handleClick}>Submenu second menu item</DropdownItem>
    </Dropdown>
  );
};

<Dropdown>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem renderSubmenu={renderSubmenu} onClick={handleClick}>
    This menu item has submenu
  </DropdownItem>
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```

Themed Dropdown:

```jsx
const { Dropdown, DropdownItem, DropdownHeader, DropdownDivider } = require('../../index');
const handleClick = () => alert('menu clicked');

<Dropdown theme="secondary">
  <DropdownHeader>Hello there</DropdownHeader>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```
