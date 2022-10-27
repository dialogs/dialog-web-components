Default Avatar:

```
<Avatar />
```

Avatar with custom background color:

```
<Avatar title="Test" placeholder="blue" />
```

Default Avatar with image:

```
<Avatar
  title="Test"
  image="https://octodex.github.com/images/total-eclipse-of-the-octocat.jpg"
/>
```

Avatar sizes:

```
<div>
  <Avatar title="Super Size" placeholder="green" size="super" />
  <Avatar title="Valera Kotovski" placeholder="empty" size="big" />
  <Avatar title="Hello World" placeholder="lblue" size="large" />
  <Avatar title="Bad Timmy" placeholder="blue" size="medium" />
  <Avatar title="Ashley Simpson" placeholder="purple" size="small" />
  <Avatar title="Ray Charles" placeholder="red" size="tiny" />
</div>
```

You can set avatar size in pixels:

```
<div>
  <Avatar title="Valera Kotovski" placeholder="empty" size={50} />
  <Avatar title="Hello World" placeholder="lblue" size={100} />
  <Avatar title="Bad Timmy" placeholder="blue" size={200} />
</div>
```

Clickable Avatar:

```
<Avatar
  title="Test"
  placeholder="green"
  size="large"
  onClick={() => alert('Handle click')}
/>
```
