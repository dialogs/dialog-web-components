Basic Textarea:

    initialState = { value: '' };
    <Textarea
      id="textarea_basic"
      label="Basic"
      value={state.value}
      onChange={(value) => setState({ value })}
    />


Textarea without label:

    <Textarea
      id="textarea_no_label"
      value={state.value}
      onChange={(value) => setState({ value })}
    />

Disabled Textarea:

    <Textarea
      id="textarea_disabled"
      label="Disabled"
      disabled
    />

Success Textarea with hint:

    <Textarea
      id="textarea_success_hint"
      label="Email"
      value="bob@example.com"
      hint="Correct email"
      status="success"
    />

Error Textarea with hint:

    <Textarea
      id="textarea_error_hint"
      label="Email"
      value="bob at example.com"
      hint="Incorrect email"
      status="error"
    />
