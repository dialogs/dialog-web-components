Basic SidebarHeader:

```
const SidebarHeaderMenu = require('../SidebarHeaderMenu/SidebarHeaderMenu').default;
const Dropdown = require('../Dropdown/Dropdown').default;
const DropdownItem = require('../DropdownItem/DropdownItem').default;
const DropdownDivider = require('../DropdownDivider/DropdownDivider').default;
const handleClick = () => alert('menu clicked');
const user = {
  title: 'Someone',
  placeholder: 'green',
  avatar: null
};

<SidebarHeader>
  <SidebarHeaderMenu appName="Dialog">
    <Dropdown isOpen>
      <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
      <DropdownItem onClick={handleClick}>Last menu item</DropdownItem>
    </Dropdown>
  </SidebarHeaderMenu>
</SidebarHeader>
```
