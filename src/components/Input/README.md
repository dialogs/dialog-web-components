Basic Input:

    initialState = { value: '' };
    <Input
      id="input_basic"
      label="Basic"
      placeholder="Basic placeholder"
      value={state.value}
      onChange={(value) => setState({ value })}
    />


Input without label:

    initialState = { value: '' };
    <Input
      id="input_no_label"
      value={state.value}
      onChange={(value) => setState({ value })}
    />

Disabled Input:

    <Input
      id="input_disabled"
      label="Disabled"
      value=""
      disabled
    />

Success Input with hint:

    <Input
      id="input_success_hint"
      label="Email"
      value="bob@example.com"
      hint="Correct email"
      status="success"
    />

Error Input with hint:

    <Input
      id="input_error_hint"
      label="Email"
      value="bob at example.com"
      hint="Incorrect email"
      status="error"
    />
