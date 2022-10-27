Basic SidebarHeader:

```
const {
  Logo,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  SidebarHeaderMenu,
  SidebarHeaderPlus
} = require('../../index');

const renderMainMenu = () => {
  return (
    <Dropdown>
      <DropdownItem onClick={console.debug}>First menu item</DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={console.debug}>Very very very very loooong menu item</DropdownItem>
      <DropdownItem onClick={console.debug}>Last menu item</DropdownItem>
    </Dropdown>
  );
};
const renderPlusMenu = () => {
  return (
    <Dropdown>
      <DropdownItem onClick={console.debug}>Menu item</DropdownItem>
      <DropdownItem onClick={console.debug}>Menu item</DropdownItem>
      <DropdownItem onClick={console.debug}>Menu item</DropdownItem>
    </Dropdown>
  );
};


<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarHeader>
    <SidebarHeaderMenu
      appName="dialog"
      logo={<Logo />}
      renderMenu={renderMainMenu}
    />
    <SidebarHeaderPlus
      renderMenu={renderPlusMenu}
    />
  </SidebarHeader>
</div>
```
