Basic Switcher:

    initialState = { value: true };
    <Switcher
      id="example"
      checked={state.value}
      onChange={() => setState({ value: !state.value })}
    />

Disabled Switcher:

    <Switcher
      id="disabled"
      checked={true}
      disabled
    />
