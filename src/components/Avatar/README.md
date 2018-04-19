Default Avatar:

```jsx
<Avatar />
```

Avatar with custom background color:

```jsx
<Avatar title="Test" placeholder="blue" />
```

Default Avatar with image:

```jsx
<Avatar
  title="Test"
  image="https://octodex.github.com/images/total-eclipse-of-the-octocat.jpg"
/>
```

Avatar sizes:

```jsx
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

```jsx
<div>
  <Avatar title="🤟 Kotovski" placeholder="empty" size={150} />
  <Avatar title="Hello  World" placeholder="lblue" size={100} />
  <Avatar title="Bad Timmy" placeholder="blue" size={200} />
</div>
```

Clickable Avatar:

```jsx
<Avatar
  title="Test"
  placeholder="green"
  size="large"
  onClick={() => alert('Handle click')}
/>
```
