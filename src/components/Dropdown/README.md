Basic Dropdown:

    const DropdownMenuItem = require('./DropdownMenuItem').default;
    const DropdownMenuDivider = require('./DropdownMenuDivider').default;
    const handleClick = () => alert('menu clicked');

    <Dropdown isOpen>
      <DropdownMenuItem onClick={handleClick}>First menu item</DropdownMenuItem>
      <DropdownMenuItem onClick={handleClick}>Very very very very loooong menu item</DropdownMenuItem>
      <DropdownMenuDivider />
      <DropdownMenuItem onClick={handleClick}>Another menu item</DropdownMenuItem>
      <DropdownMenuItem onClick={handleClick}>Last menu item</DropdownMenuItem>
    </Dropdown>
