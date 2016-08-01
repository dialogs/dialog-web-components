Basic Dropdown:

    const DropdownItem = require('./DropdownItem').default;
    const DropdownDivider = require('./DropdownDivider').default;
    const handleClick = () => alert('menu clicked');

    <Dropdown isOpen>
      <DropdownItem onClick={handleClick}>First menu item</DropdownItem>
      <DropdownItem onClick={handleClick}>Very very very very loooong menu item</DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={handleClick}>Another menu item</DropdownItem>
      <DropdownItem onClick={handleClick}>Last menu item</DropdownItem>
    </Dropdown>
