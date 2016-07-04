import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';

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
    onClick: PropTypes.func
  };

  render() {
    return (
      <Avatar
        className={this.props.className}
        size={this.props.size}
        image={this.props.user.avatar}
        title={this.props.user.title}
        placeholder={this.props.user.placeholder}
        onClick={this.props.onClick}
      />
    );
  }
}

export default UserAvatar;
