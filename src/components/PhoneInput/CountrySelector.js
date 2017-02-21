/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from './PhoneInput';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Trigger from '../Trigger/Trigger';
import Emoji   from '../Emoji/Emoji';
import CountrySelectorDropdown from './CountrySelectorDropdown';
import countryCodes from '@dlghq/country-codes';
import styles from './PhoneInput.css';

export type Props = {
  country: Country,
  onCountryChange: (country: Country) => void,
};

class CountrySelector extends PureComponent {
  props: Props;

  renderTrigger = (handlers: Object): React.Element<any> => {
    const current = countryCodes.find((item) => item.alpha2 === this.props.country.alpha2);

    return (
      <div {...handlers} className={styles.selectorCurrent}>
        {current.alpha2}
        <Emoji char={current.emoji} />
      </div>
    );
  };

  renderMenu = (): React.Element<any> => {
    return (
      <CountrySelectorDropdown onSelect={this.props.onCountryChange} />
    );
  };

  render(): React.Element<any> {
    const options = {
      attachment: 'middle center',
      targetAttachment: 'middle center',
      constraints: [{
        to: 'scrollParent',
        attachment: 'together',
        pin: true
      }],
      targetOffset: '0 0'
    };

    return (
      <div className={styles.selector}>
        <Trigger
          options={options}
          renderTrigger={this.renderTrigger}
          renderChild={this.renderMenu}
          openHandler={['onClick']}
          closeHandler={['onClick']}
          closeOnDocumentClick
          closeOnDocumentScroll
        />
      </div>
    );
  }
}

export default CountrySelector;
