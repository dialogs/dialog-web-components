Basic Dropdown:

```
const {
  DropdownItem,
  DropdownDivider,
  PeerAvatar
} = require('../../index');

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
    <PeerAvatar peer={user} />
    <b style={{ marginLeft: 8 }}>{user.title}</b>
  </DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem onClick={handleClick} active>Very very very very loooong menu item</DropdownItem>
  <DropdownItem onClick={handleClick}>Last menu item</DropdownItem>
</Dropdown>
```

Dropdown with Divider:

```
const {
  DropdownItem,
  DropdownDivider
} = require('../../index');

const handleClick = () => alert('menu clicked');

<Dropdown>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```

Dropdown with Header:

```
const {
  DropdownItem,
  DropdownHeader
} = require('../../index');

const handleClick = () => alert('menu clicked');

<Dropdown>
  <DropdownHeader>Hello there</DropdownHeader>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownHeader>There is another one heading</DropdownHeader>
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```

Themed Dropdown:

```
const {
  DropdownItem,
  DropdownHeader,
  DropdownDivider
} = require('../../index');

const handleClick = () => alert('menu clicked');

<Dropdown theme="secondary">
  <DropdownHeader>Hello there</DropdownHeader>
  <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
  <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
</Dropdown>
```
