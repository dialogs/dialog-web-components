Basic Checkbox:

    'value' in state || setState({ value: true });
    <Checkbox
      value={state.value}
      label="Hello, world!"
      onChange={() => setState({ value: !state.value })}
    />
