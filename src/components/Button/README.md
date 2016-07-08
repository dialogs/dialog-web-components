Basic Button:

    <div>
      <Button theme="flat" onClick={() => alert('Button click handler')}>
        Flat, clickable, button
      </Button>
      <Button theme="raised">
        I'm a raised button
      </Button>
      <Button theme="shade">
        And I'm a shade button
      </Button>
    </div>

Different Button Sizes:

    <div>
    <Button size="large">BEEG Button</Button>
    <Button>Default size button</Button>
    <Button size="small">Just a small button</Button>
    <hr/>
    <Button theme="raised" size="large">BEEG Button</Button>
    <Button theme="raised">Default size button</Button>
    <Button theme="raised" size="small">Just a small button</Button>
    <hr/>
    <Button theme="shade" size="large">BEEG Button</Button>
    <Button theme="shade">Default size button</Button>
    <Button theme="shade" size="small">Just a small button</Button>
    </div>

Disabled Button:

    <div>
      <Button theme="flat" disabled>Disabled flat button</Button>
      <Button theme="raised" disabled>Disabled raised button</Button>
      <Button theme="shade" disabled>Disabled shade button</Button>
    </div>
