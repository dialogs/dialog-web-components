/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { listen } from '@dlghq/dialog-utils';
import { AutoSizer } from 'react-virtualized';
import classNames from 'classnames';
import styles from './Scroller.css';

export type Dimensions = {
  scrollTop: number,
  scrollHeight: number,
  offsetHeight: number
};

export type Props = {
  className?: string,
  children?: React.Element<any>,
  onScroll?: () => void,
  onResize?: (size: {width: number, height: number}) => void,
  fromBottom: boolean
};

class Scroller extends Component {
  props: Props;
  container: ?HTMLElement;
  listener: ?{ remove(): void };

  static defaultProps = {
    fromBottom: false
  };

  componentDidMount(): void {
    if (this.container) {
      this.listener = listen(this.container, 'scroll', this.handleScroll, { passive: true });
    }
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  componentWillUnmount(): void {
    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }
  }

  handleScroll = (): void => {
    if (this.props.onScroll) {
      this.props.onScroll();
    }
  };

  getDimensions(): ?Dimensions {
    if (this.container) {
      return {
        scrollTop: this.container.scrollTop,
        scrollHeight: this.container.scrollHeight,
        offsetHeight: this.container.offsetHeight
      };
    }

    return null;
  }

  getBoundingClientRect(): ?ClientRect {
    if (this.container) {
      return this.container.getBoundingClientRect();
    }

    return null;
  }

  setContainer = (container: HTMLElement): void => {
    this.container = container;
  };

  scrollTo(offset: number): void {
    if (this.container) {
      this.container.scrollTop = offset;
    }
  }

  scrollToBottom(): void {
    if (this.container) {
      this.scrollTo(
        this.container.scrollHeight
      );
    }
  }

  scrollToNode(node: HTMLElement, withGap: boolean = false): void {
    if (this.container) {
      const gap = withGap ? Math.floor(this.container.clientHeight * 0.4) : 0;
      this.scrollTo(
        Math.min(node.offsetTop - gap, this.container.scrollHeight)
      );
    }
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, {
      [styles.fromBottom]: this.props.fromBottom
    });

    return (
      <AutoSizer onResize={this.props.onResize}>
        {(size) => (
          <div className={this.props.className} style={size}>
            <div className={className} ref={this.setContainer}>
              {this.props.children}
            </div>
          </div>
        )}
      </AutoSizer>
    );
  }
}

export default Scroller;
