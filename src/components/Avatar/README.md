Default Avatar:

    <Avatar />

Avatar with custom background color:

    <Avatar title="Test" placeholder="blue" />

Default Avatar with image:

    <Avatar
      title="Test"
      image="https://octodex.github.com/images/total-eclipse-of-the-octocat.jpg"
    />

Avatar sizes:

    <div>
      <Avatar title="Valera Kotovski" placeholder="orange" size="big" />
      <Avatar title="Hello World" placeholder="green" size="large" />
      <Avatar title="Bad Timmy" placeholder="blue" size="medium" />
      <Avatar title="Ashley Simpson" placeholder="green" size="small" />
      <Avatar title="Ray Charles" placeholder="orange" size="tiny" />
    </div>

Clickable Avatar:

    <Avatar
      title="Test"
      placeholder="green"
      size="large"
      onClick={() => alert('Handle click')}
    />
