```
const SidebarFooterButton = require('./SidebarFooterButton').default;
const variants = [
  {
    id: 'messages', title: 'Messages', glyph: 'logo', pending: false
  }, {
    id: 'archive', title: 'Archive', glyph: 'schedule', pending: true
  }
];

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarFooter
    current={variants[0]}
    variants={variants}
  />
</div>
```
