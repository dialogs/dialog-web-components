Basic Confirm:

```
const actions = {
  onClick: () => Confirm({
    question: 'hello',
    submit: 'ok',
    cancel: 'cancel',
    theme: 'danger'
  }, console.debug)
};

<Button {...actions}>Click me</Button>
```
