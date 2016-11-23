Basic SidebarHeader:

```
const {
  Logo,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  SidebarHeaderMenu
} = require('../../index');

const handleClick = () => alert('menu clicked');

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarHeader>
    <SidebarHeaderMenu appName="Dialog" logo={<Logo />}>
      <Dropdown>
        <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
        <DropdownItem onClick={handleClick}>Last menu item</DropdownItem>
      </Dropdown>
    </SidebarHeaderMenu>
  </SidebarHeader>
</div>
```
