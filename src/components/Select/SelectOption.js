import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Select.css';

export type Option = {
  value: string,
  title: string
};

export type Props = Option & {
  option: Option,
  active: boolean,
  onClick: (value: Option) => any
};

class SelectOption extends PureComponent {
  props: Props

  handleClick = (): void => {
    this.props.onClick(this.props.option);
  };

  render(): React.Element<any> {
    const { active, option: { title } } = this.props;
    const className = classNames(
      styles.option,
      active ? styles.optionActive : null
    );

    return (
      <div className={className} onClick={this.handleClick}>
        {title}
      </div>
    );
  }
}

export default SelectOption;
