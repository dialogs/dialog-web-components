Basic ActivityListMembers:

```
const members = [{
  peerInfo: {
    peer: {
      type: 'user',
      id: 1903089995,
      key: 'u1903089995'
    },
    title: 'Daredevil',
    userName: 'daredevil',
    avatar: 'https://storage.googleapis.com/prod-dlg-storage/ddb64f658b3722363cb494b63677974b12fecc96%2Fsmall-avatar.jpg?GoogleAccessId=devops@dialog-1320.iam.gserviceaccount.com&Expires=1475163590&Signature=JWalSoXY%2BFM0tVqf%2FGOsqdooCcMa8fe1FVc%2FEx%2Bxzd3WBjmgLzM4l3RkL6PCZ%2FYMxyZxp%2BeickGV%2BPFbFxAHthLlGvGRZjP4Ni%2Ftz9FW0T9ZiRk8sKK0Uriaervzxq9VdrH1g4ufqiOGFG8kPGdzmUpAJjYTCNv6pH3hzmEx2pG%2FZfYU1bs1A2SBZk%2FEHC%2BhuHu6Q5Ko7TfrKs0cmzhuVI5iCXnAMb81wJHfGh%2BnQSMlZOzMhYi79DytJOJ8m04bbdBAvu5hHVK4XdmBXv%2Fjnle%2BxFKmierx7czZD2pk21P9xzBrOGizF7sP%2BbV2kA0SbTc%2BTXzfvUUiqFaTrkhXYA%3D%3D',
    placeholder: 'purple',
    isVerified: false
  },
  isAdmin: true,
  canKick: true
}];
const online = {
  isNotMember: false,
  message: '1 member, 1 online',
  online: 1,
  total: 3
};

<div style={{ background: '#fff', width: 320 }}>
  <ActivityListMembers members={members} online={online} />
</div>
```
