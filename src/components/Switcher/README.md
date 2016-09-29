Basic Switcher:

    initialState = { value: true };
    <Switcher
      id="example"
      value={state.value}
      onChange={(value) => setState({ value })}
    />

Disabled Switcher:

    initialState = { value: true };
    <Switcher
      disabled
      id="disabled"
      value={state.value}
      onChange={(value) => setState({ value })}
    />
