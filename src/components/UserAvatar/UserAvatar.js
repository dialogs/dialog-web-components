import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import styles from './UserAvatar.css';

class UserAvatar extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.shape({
      title: PropTypes.string,
      avatar: PropTypes.string,
      placeholder: PropTypes.oneOf([
        'empty', 'lblue', 'blue', 'purple', 'red', 'orange', 'yellow', 'green'
      ])
    }).isRequired,
    size: PropTypes.oneOf([
      'tiny', 'small', 'medium', 'large', 'big', 'huge'
    ]),
    online: PropTypes.bool.isRequired,
    onClick: PropTypes.func
  };

  shouldComponentUpdate(prevProps) {
    return prevProps.online !== this.props.online ||
           prevProps.user !== this.props.user ||
           prevProps.size !== this.props.size ||
           prevProps.className !== this.props.className;
  }

  render() {
    const className = classNames({
      [styles.online]: this.props.online
    });

    return (
      <div className={className}>
        <Avatar
          className={this.props.className}
          size={this.props.size}
          image={this.props.user.avatar}
          title={this.props.user.title}
          placeholder={this.props.user.placeholder}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

export default UserAvatar;
