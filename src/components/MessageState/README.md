Default states:

```jsx
<div>
  <MessageState state="pending" time="pending" fullTime={new Date()} />
  <br />
  <MessageState state="sent" time="sent" fullTime={new Date()} />
  <br />
  <MessageState state="received" time="received" fullTime={new Date()} />
  <br />
  <MessageState state="read" time="read" fullTime={new Date()} />
  <br />
  <MessageState state="error" time="error" fullTime={new Date()} />
</div>
```

Edited state:

```jsx
<MessageState state="received" time="received" isEdited fullTime={new Date()} />
```
