Danger:

```jsx
<Confirm 
  request={{
    question: 'Are you going to delete this message?',
    submit: 'Delete',
    cancel: 'Cancel',
    theme: 'danger'
  }} 
  onSubmit={() => {}}
/>
```

Warning:

```jsx
<Confirm 
  request={{
    question: 'Are you going to clear chat history?',
    submit: 'Clear',
    cancel: 'Cancel',
    theme: 'warning'
  }} 
  onSubmit={() => {}}
/>
```

Success:

```jsx
<Confirm 
  request={{
    question: 'Are you going to add this user to contacts?',
    submit: 'Add',
    cancel: 'Cancel',
    theme: 'success'
  }} 
  onSubmit={() => {}}
/>
```
