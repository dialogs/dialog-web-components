```jsx
<div>
  <UserStatus status="unset" />
  <br />
  <UserStatus status="away" />
  <br />
  <UserStatus status="do_not_disturb" />
  <br />
  <UserStatus status="invisible" />
</div>
```

You can render just status text without dot by adding `withoutDot` to component props

```jsx
<div>
  <UserStatus status="unset" withoutDot />
  <br />
  <UserStatus status="away" withoutDot />
  <br />
  <UserStatus status="do_not_disturb" withoutDot />
  <br />
  <UserStatus status="invisible" withoutDot />
</div>
```
