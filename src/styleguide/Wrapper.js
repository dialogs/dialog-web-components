import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from '@dlghq/react-l10n';
import classNames from 'classnames';
import { ModalProvider } from '../components/Modal';

import messages from './devMessages';
import Select from '../components/Select/Select';
import Switcher from '../components/Switcher/Switcher';
import styles from './Wrapper.css';
import createSequence from '../utils/createSequence';

const seq = createSequence();

class Wrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      locale: 'en',
      isTransparent: false
    };

    this.id = 'background_toggler_' + seq.next();
  }

  handleLocaleChange = (locale) => this.setState({ locale });
  handleBackgroundToggle = (isTransparent) => this.setState({ isTransparent });

  renderLocaleSelect() {
    const options = [{ value: 'en', title: 'English' }, { value: 'ru', title: 'Russian' }];

    return (
      <div className={styles.selectWrapper}>
        <Select
          value={this.state.locale}
          options={options}
          size="small"
          className={styles.select}
          onChange={this.handleLocaleChange}
        />
      </div>
    );
  }

  renderBackgroundToggle() {
    const { isTransparent } = this.state;

    return (
      <Switcher
        id={this.id}
        name="toggle"
        className={styles.toggle}
        value={isTransparent}
        onChange={this.handleBackgroundToggle}
        label="Transparent background"
      />
    );
  }

  render() {
    const wrapperClassName = classNames(styles.wrapper, this.state.isTransparent ? styles.transparent : styles.white);

    return (
      <ModalProvider>
        <Provider locale={this.state.locale} messages={messages} globalValues={{ appName: 'dialog' }}>
          <div className={styles.container}>
            <header className={styles.header}>
              {this.renderBackgroundToggle()}
              <div className={styles.spacer} />
              {this.renderLocaleSelect()}
            </header>
            <div className={wrapperClassName}>
              {this.props.children}
            </div>
          </div>
        </Provider>
      </ModalProvider>
    );
  }
}

export default Wrapper;
