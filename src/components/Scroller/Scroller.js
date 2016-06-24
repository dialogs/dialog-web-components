import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Scroller.css';

class Scroller extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onScroll: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired
  };

  static defaultProps = {
    onScroll: () => {},
    onResize: () => {}
  };

  constructor(props) {
    super(props);

    this.onResize = this.onResize.bind(this);
    this.onReference = this.onReference.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }

  onResize() {
    this.props.onResize();
  }

  onReference(node) {
    this.container = node;
  }

  getDimensions() {
    return {
      scrollTop: this.container.scrollTop,
      scrollHeight: this.container.scrollHeight,
      offsetHeight: this.container.offsetHeight
    };
  }

  getBoundingClientRect() {
    return this.container.getBoundingClientRect();
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={styles.wrapper}>
        <div className={className} ref={this.onReference} onScroll={this.props.onScroll}>
          {this.props.children}
        </div>
      </div>
    );
  }

  scrollTo(offset) {
    this.container.scrollTop = offset;
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  scrollToNode(node) {
    this.scrollTo(Math.min(node.offsetTop, this.container.scrollHeight));
  }
}

export default Scroller;
