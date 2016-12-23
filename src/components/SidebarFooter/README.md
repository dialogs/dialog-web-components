```
const SidebarFooterButton = require('./SidebarFooterButton').default;
const renderButtons = () => {
  const buttons = [{
    glyph: 'logo', handler: console.debug
  }, {
    glyph: 'history', handler: console.debug
  }]

  return buttons.map((button) => {
    return (
      <SidebarFooterButton
        glyph={button.glyph}
        onClick={button.handler}
        active={false}
      />
    );
  });
};

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarFooter
    renderButtons={renderButtons}
  />
</div>

```
