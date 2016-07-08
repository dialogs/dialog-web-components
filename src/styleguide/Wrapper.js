import React, { Component, PropTypes } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import compileMessages from '../utils/compileMessages';
import styles from './Wrapper.css';

addLocaleData(en);
addLocaleData(ru);

const requireMessags = require.context('../components', true, /l10n\/[A-Za-z]+\.yml$/);

const translations = {};
requireMessags.keys().forEach((pathname) => {
  const [, name, locale] = pathname.match(/([A-Za-z]+)\/l10n\/([A-Za-z]+)\.yml$/);
  if (!translations[locale]) {
    translations[locale] = {};
  }

  Object.assign(translations[locale], compileMessages(name, requireMessags(pathname)));
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
    const messages = translations[locale];

    return (
      <div>
        <div className={styles.select}>
          <select value={locale} onChange={this.handleLocaleChange}>
            <option value="en">Engligh</option>
            <option value="ru">Russian</option>
          </select>
        </div>
        <div className={styles.container}>
          <IntlProvider locale={locale} messages={messages}>
            {this.props.children}
          </IntlProvider>
        </div>
      </div>
    );
  }
}

export default Wrapper;
