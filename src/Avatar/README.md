Default Avatar with placeholder:

    <Avatar title="Test" placeholder="red" />

Default Avatar with image:

    <Avatar title="Test" image="https://octodex.github.com/images/total-eclipse-of-the-octocat.jpg" />

Avatar sizes:

    <div>
      <Avatar title="Adam" placeholder="yellow" size="huge" />
      <Avatar title="Vera" placeholder="orange" size="big" />
      <Avatar title="Alex" placeholder="green" size="large" />
      <Avatar title="Timmy" placeholder="lblue" size="medium" />
      <Avatar title="Ashley" placeholder="blue" size="small" />
      <Avatar title="Ray" placeholder="purple" size="tiny" />
    </div>

Clickable Avatar:

    <Avatar
      title="Test"
      placeholder="green"
      size="medium"
      onClick={() => alert('Handle click')}
    />
