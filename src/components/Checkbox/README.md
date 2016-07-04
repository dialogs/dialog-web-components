Basic Checkbox:

    initialState = { value: true };
    <Checkbox
      id="basic"
      value={state.value}
      label="Hello, world!"
      onChange={() => setState({ value: !state.value })}
    />

Disabled Checkbox:

    <Checkbox
      id="disabled"
      label="I'm, disabled )="
      value
      disabled
      onChange={() => {}}
    />
