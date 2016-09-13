Basic Dropdown:

```
const DropdownItem = require('./DropdownItem').default;
const DropdownDivider = require('./DropdownDivider').default;
const PeerAvatar = require('../PeerAvatar').default;
const handleClick = () => alert('menu clicked');
const user = {
  title: 'Someone',
  placeholder: 'green',
  avatar: null
};

<Dropdown isOpen>

  <DropdownItem>
    <PeerAvatar peer={user} />
    <b style={{ marginLeft: 8 }}>{user.title}</b>
  </DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
  <DropdownItem onClick={handleClick}>Last menu item</DropdownItem>
</Dropdown>
```

Dropdown with Divider:

```
const DropdownItem = require('./DropdownItem').default;
const DropdownDivider = require('./DropdownDivider').default;
const handleClick = () => alert('menu clicked');

<Dropdown isOpen>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```

Dropdown with Header:

```
const DropdownHeader = require('./DropdownHeader').default;
const DropdownItem = require('./DropdownItem').default;
const handleClick = () => alert('menu clicked');

<Dropdown isOpen>
  <DropdownHeader>Hello there</DropdownHeader>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownHeader>There is another one heading</DropdownHeader>
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```

Themed Dropdown:

```
const DropdownHeader = require('./DropdownHeader').default;
const DropdownItem = require('./DropdownItem').default;
const DropdownDivider = require('./DropdownDivider').default;
const handleClick = () => alert('menu clicked');

<Dropdown isOpen theme="secondary">
  <DropdownHeader>Hello there</DropdownHeader>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```
