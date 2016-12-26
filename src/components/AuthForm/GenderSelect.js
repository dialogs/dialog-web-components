
import React, { PureComponent } from 'react';
import RadioGroup from '../Radio/RadioGroup';
import Radio from '../Radio/Radio';
import styles from './AuthForm.css';

class GenderSelect extends PureComponent {
  render() {
    return (
      <div>
        Gender:
        <RadioGroup name="radio_basic" value="male" onChange={console.debug} className={styles.radioGroup}>
          <Radio value="male" className={styles.radio}>
            Male
          </Radio>
          <Radio value="female" className={styles.radio}>
            Female
          </Radio>
        </RadioGroup>
      </div>
    );
  }
}

export default GenderSelect;
