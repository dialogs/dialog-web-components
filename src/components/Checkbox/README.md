Basic Checkbox:

    'value' in state || setState({ value: true });
    <Checkbox
      id="basic"
      checked={state.value}
      label="Hello, world!"
      onChange={() => setState({ value: !state.value })}
    />

Disabled Checkbox:

    <Checkbox
      id="disabled"
      checked={true}
      label="I'm, disabled )="
      disabled
    />
