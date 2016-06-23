Basic Switcher:

    'value' in state || setState({ value: true });
    <Switcher
      id="example"
      value={state.value}
      onChange={() => setState({ value: !state.value })}
    />

Disabled Switcher:

    <Switcher
      id="disabled"
      value={true}
      disabled
    />
