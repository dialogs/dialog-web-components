import React, { Component, PropTypes } from 'react';
import { Provider } from '@dlghq/react-l10n';
import compileMessages from '../utils/compileMessages';
import styles from './Wrapper.css';

const requireMessags = require.context('../components', true, /l10n\/[A-Za-z]+\.yml$/);

const messages = {};
requireMessags.keys().forEach((pathname) => {
  const [, name, locale] = pathname.match(/([A-Za-z]+)\/l10n\/([A-Za-z]+)\.yml$/);
  if (!messages[locale]) {
    messages[locale] = {};
  }

  Object.assign(messages[locale], compileMessages(name, requireMessags(pathname)));
});

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
          <Provider locale={locale} messages={messages}>
            {this.props.children}
          </Provider>
        </div>
      </div>
    );
  }
}

export default Wrapper;
