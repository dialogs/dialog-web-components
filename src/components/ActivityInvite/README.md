Basic ActivityInvite:

```
const getRandomHash = () => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  
  for( var i=0; i < 10; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

   return text;
};

initialState = {
  link: `https://dlg.im/join/${getRandomHash()}`
};

const handleRevoke = () => {
  setState({link: `https://dlg.im/join/${getRandomHash()}`});
};

<div style={{ background: '#fff', width: 320 }}>
  <ActivityInvite
    link={state.link}
    onRevoke={handleRevoke}
  />
</div>

```
