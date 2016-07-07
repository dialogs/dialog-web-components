Login Form:

    initialState = { login: null, code: null, name: null };
    <LoginForm
      login={state.login}
      code={state.code}
      name={state.name}
      onLoginChange={(login) => this.setState({ login })}
      onCodeChange={(code) => this.setState({ code })}
      onNameChange={(name) => this.setState({ name })}
    />
