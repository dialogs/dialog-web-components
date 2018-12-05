A component for displaying the user avatar.
If there is no image, it shows the initials from `title` on the gradient background.

Avatar with image:

```jsx
<div>
  <Avatar
    title="Valera Kotovski"
    placeholder="empty"
    size={50}
    image="https://picsum.photos/200/200/?1"
  />
  <Avatar
    title="Hello World"
    placeholder="lblue"
    size={50}
    image="https://picsum.photos/200/200/?2"
  />
  <Avatar
    title="Bad Timmy"
    placeholder="blue"
    size={50}
    image="https://picsum.photos/200/200/?3"
  />
  <Avatar
    title="Ashley Simpson"
    placeholder="purple"
    size={50}
    image="https://picsum.photos/200/200/?4"
  />
  <Avatar
    title="Ray Charles"
    placeholder="red"
    size={50}
    image="https://picsum.photos/200/200/?5"
  />
  <Avatar
    title="Someone Else"
    placeholder="orange"
    size={50}
    image="https://picsum.photos/200/200/?6"
  />
  <Avatar
    title="Net Vdohnoveniya"
    placeholder="yellow"
    size={50}
    image="https://picsum.photos/200/200/?7"
  />
  <Avatar
    title="Vladimir Vladimirovich"
    placeholder="green"
    size={50}
    image="https://picsum.photos/200/200/?8"
  />
</div>
```

Avatar without image:

```jsx
<div>
  <Avatar title="Valera Kotovski" placeholder="empty" size={50} />
  <Avatar title="Hello World" placeholder="lblue" size={50} />
  <Avatar title="Bad Timmy" placeholder="blue" size={50} />
  <Avatar title="Ashley Simpson" placeholder="purple" size={50} />
  <Avatar title="Ray Charles" placeholder="red" size={50} />
  <Avatar title="Someone Else" placeholder="orange" size={50} />
  <Avatar title="Net Vdohnoveniya" placeholder="yellow" size={50} />
  <Avatar title="Vladimir Vladimirovich" placeholder="green" size={50} />
</div>
```

Avatar without title:

```jsx
<div>
  <Avatar placeholder="empty" size={50} />
  <Avatar placeholder="lblue" size={50} />
  <Avatar placeholder="blue" size={50} />
  <Avatar placeholder="purple" size={50} />
  <Avatar placeholder="red" size={50} />
  <Avatar placeholder="orange" size={50} />
  <Avatar placeholder="yellow" size={50} />
  <Avatar placeholder="green" size={50} />
</div>
```

Avatar change props test:

```jsx
initialState = {
  image: null,
};

const status = ['away', 'unset', 'invisible', 'do_not_disturb'];

const handleImageChange = () => {
  setState({
    image: `https://picsum.photos/500/500/?${Math.floor(Math.random() * 20)}`,
  });
};

const handleImageRemove = () => {
  setState({ image: null });
};

const handleStatusChange = () => {
  setState({ status: status[Math.floor(Math.random() * status.length)] });
};

<div>
  <div className="styleguide__buttons">
    <Button onClick={handleImageChange} theme="primary" size="small">
      Change image
    </Button>
    <Button
      onClick={handleImageRemove}
      theme="warning"
      size="small"
      disabled={!state.image}
    >
      Remove image
    </Button>
    <Button onClick={handleStatusChange} theme="primary" size="small">
      Randomize status
    </Button>
  </div>
  <br />
  <Avatar
    placeholder="empty"
    size={150}
    image={state.image}
    title="Valera Kotovski"
    onClick={console.log}
    status={state.status}
  />
</div>;
```
