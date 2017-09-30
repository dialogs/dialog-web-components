Sizable Button

```jsx
<div className="styleguide__buttons">
  <Button size="small">Small Button</Button>
  <Button size="normal">Normal Button</Button>
  <Button size="large">Large Button</Button>
</div>
```


It has different types of themes. You can change themes by changing `theme` prop.

```jsx
<div className="styleguide__buttons">
  <Button theme="default">Default</Button>
  <Button theme="primary">Primary</Button>
  <Button theme="success">Success</Button>
  <Button theme="danger">Danger</Button>
  <Button theme="info">Info</Button>
  <Button theme="warning">Warning</Button>
</div>
```

Outlined Button:

```jsx
<div className="styleguide__buttons">
  <Button theme="default" view="outline">Default</Button>
  <Button theme="primary" view="outline">Primary</Button>
  <Button theme="success" view="outline">Success</Button>
  <Button theme="danger" view="outline">Danger</Button>
  <Button theme="info" view="outline">Info</Button>
  <Button theme="warning" view="outline">Warning</Button>
</div>
```

Link Button:

```jsx
<div className="styleguide__buttons">
  <Button theme="default" view="link">Default</Button>
  <Button theme="primary" view="link">Primary</Button>
  <Button theme="success" view="link">Success</Button>
  <Button theme="danger" view="link">Danger</Button>
  <Button theme="info" view="link">Info</Button>
  <Button theme="warning" view="link">Warning</Button>
</div>
```

Wide Button:

```jsx
<div className="styleguide__buttons">
  <Button theme="primary" size="small" wide>Small</Button>
  <Button theme="primary" wide>Default</Button>
  <Button theme="primary" size="large" wide>Large</Button>
  <Button theme="primary" disabled wide>Disabled</Button>
</div>
```

Loading Button:

```jsx
<Button theme="primary" loading>
  Loading
</Button>
```
