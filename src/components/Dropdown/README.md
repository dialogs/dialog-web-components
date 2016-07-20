Basic Dropdown:

    const MenuItem = require('./DropdownMenuItem').default;
    const handleClick = () => alert('menu clicked');

    <Dropdown isOpen>
      <MenuItem onClick={handleClick}>Menu item 1</MenuItem>
      <MenuItem onClick={handleClick}>Menu item 2</MenuItem>
      <MenuItem onClick={handleClick}>Menu item 3</MenuItem>
    </Dropdown>
