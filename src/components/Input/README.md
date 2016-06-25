Basic Input:

    class Test extends React.Component {
      constructor(props) {
        super(props);

        this.state = { value: '' };
      }

      render() {
        return (
          <Input
            id="input_basic"
            label="Basic"
            value={this.state.value}
            onChange={(value) => this.setState({ value })}
          />
        );
      }
    }

    <Test />


Input without label:

    <Input
      id="input_no_label"
      value={state.value}
      onChange={(value) => setState({ value })}
    />

Disabled Input:

    <Input
      id="input_disabled"
      label="Disabled"
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
