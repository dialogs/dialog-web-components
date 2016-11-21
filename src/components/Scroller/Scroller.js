/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { listen } from '@dlghq/dialog-utils';
import { AutoSizer } from 'react-virtualized';
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
  onResize?: (size: {width: number, height: number}) => void
};

class Scroller extends Component {
  props: Props;
  container: ?HTMLElement;
  listener: ?{ remove(): void };

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

  scrollToNode(node: HTMLElement): void {
    if (this.container) {
      this.scrollTo(
        Math.min(node.offsetTop, this.container.scrollHeight)
      );
    }
  }

  render(): React.Element<any> {
    return (
      <AutoSizer onResize={this.props.onResize}>
        {(size) => (
          <div className={this.props.className} style={size}>
            <div className={styles.container} ref={this.setContainer}>
              {this.props.children}
            </div>
          </div>
        )}
      </AutoSizer>
    );
  }
}

export default Scroller;
