Basic Button:

    <div>
      <Button onClick={() => alert('Button click handler')}>
        Flat, clickable, button
      </Button>
      <Button type="rised">
        I'm a rised button
      </Button>
      <Button type="shade">
        And I'm a shade button
      </Button>
    </div>

Different Button Sizes:

    <div>
      <Button size="large">BEEG Button</Button>
      <Button>Default size button</Button>
      <Button size="small">Just a small button</Button>
      <hr/>
      <Button type="rised" size="large">BEEG Button</Button>
      <Button type="rised">Default size button</Button>
      <Button type="rised" size="small">Just a small button</Button>
      <hr/>
      <Button type="shade" size="large">BEEG Button</Button>
      <Button type="shade">Default size button</Button>
      <Button type="shade" size="small">Just a small button</Button>
    </div>

Disabled Button:

    <div>
      <Button disabled>Disabled button</Button>
      <Button type="rised" disabled>Disabled button</Button>
      <Button type="shade" disabled>Disabled button</Button>
    </div>
