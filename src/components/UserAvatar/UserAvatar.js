import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './UserAvatar.css';

class UserAvatar extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.shape({
      title: PropTypes.string,
      avatar: PropTypes.string,
      placeholder: PropTypes.oneOf(['empty', 'blue', 'orange', 'green'])
    }).isRequired,
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'big']).isRequired,
    online: PropTypes.bool.isRequired,
    onClick: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.online !== this.props.online ||
           nextProps.user !== this.props.user ||
           nextProps.size !== this.props.size ||
           nextProps.className !== this.props.className;
  }

  renderAvatar() {
    const { className, size, user, onClick } = this.props;

    return (
      <Avatar
        className={className}
        size={size}
        image={user.avatar}
        title={user.title}
        placeholder={user.placeholder}
        onClick={onClick}
      />
    );
  }

  render() {
    const { online } = this.props;

    if (online) {
      return (
        <div className={styles.root}>
          {this.renderAvatar()}
          <div className={styles.online} />
        </div>
      );
    }

    return this.renderAvatar();
  }
}

export default UserAvatar;
