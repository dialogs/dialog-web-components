```
const variants = [
  {
    id: 'messages', title: 'Messages', glyph: 'logo', pending: false, counter: 140
  }, {
    id: 'contacts', title: 'Contacts', glyph: 'person', pending: false, counter: 41
  }, {
    id: 'call', title: 'Calls', glyph: 'call', pending: true, counter: 0
  }
];

initialState = {
  current: 'messages',
  isUpdateAvailable: false
};

const handlePick = (current) => setState({ current, isUpdateAvailable: true });

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarFooter
    current={state.current}
    variants={variants}
    onPick={handlePick}
    isUpdateAvailable={state.isUpdateAvailable}
    onUpdate={() => setState({ isUpdateAvailable: false })}
  />
</div>
```
