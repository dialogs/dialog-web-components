import React, { Component, PropTypes } from 'react';
import { Provider } from '@dlghq/react-l10n';
import messages from './devMessages';
import styles from './Wrapper.css';

class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      locale: 'en'
    };

    this.handleLocaleChange = this.handleLocaleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.locale !== this.state.locale ||
           nextProps.children !== this.props.children;
  }

  handleLocaleChange({ target }) {
    this.setState({ locale: target.value });
  }

  render() {
    const { locale } = this.state;

    return (
      <div>
        <div className={styles.select}>
          <select value={locale} onChange={this.handleLocaleChange}>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
        </div>
        <div className={styles.container}>
          <Provider locale={locale} messages={messages} globalValues={{ appName: 'dialog' }}>
            {this.props.children}
          </Provider>
        </div>
      </div>
    );
  }
}

export default Wrapper;
