Basic Call:

```
const initialState = {
  isOpen: false,
  small: false,
  call: {
    caller: {
      title: 'Andrey',
      placeholder: 'purple',
      avatar: 'https://storage.googleapis.com/prod-dlg-storage/afddd52af6abd1fd7003715197b803f8502fe031%2Flarge-avatar.jpg?GoogleAccessId=devops@dialog-1320.iam.gserviceaccount.com&Expires=1475665230&Signature=ORfq4ZnayHqO9oinzc7CHvAgV16H4Nbn8oRVarCJqy8CmD4VjELkFNLPqnZsQqEJni0UnIX1UDAGhwsa0UFcWFt6N%2B8WUZTCYmIENM0OIAIV%2F5GLqYN9ERYyp2KHqbwyEOkoIlS8gXjOAQAw1IBp02AzVG5XGR3u31jecbunGQ73CuPvXeWjYWecPILih2Vlwc5jGoimNwZ0RhpGZHKdP58D5PLvzigQRt7ENjD6R7JcXLsA2XeOYVLzaCyyDY2EfJge8IZ5w0hNFSErcv4TuHLbWNUEGsgI9CP4G7zYZQbiQ7RK46g679JMREotkrj%2FA%2Bjoge4%2Fyp4iWkYIcP3K3g%3D%3D'
    },
    duration: '02:30'
  }
};
const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState({ ...initialState });
const toggleSize = () => setState({ small: !state.small });

<div>
  <Button onClick={handleOpen}>Call</Button>
  <Call
    isOpen={state.isOpen}
    small={state.small}
    call={state.call}
    onCallEnd={handleClose}
    onMinimize={toggleSize}
  />
</div>
```
