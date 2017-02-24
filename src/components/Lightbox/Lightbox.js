/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

// $FlowFixMe: move this to css
import '!style!css!./photoswipe.css';

import type { PhotoSwipeItem, PhotoSwipeOptions } from 'photoswipe';
import React, { Component } from 'react';
import cx from 'classnames';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI from 'photoswipe/src/js/ui/photoswipe-ui-default';
import Icon from '../Icon/Icon';
import styles from './Lightbox.css';

export type Props = {
  className?: string,
  startIndex: number,
  items: PhotoSwipeItem[],
  options: $Shape<PhotoSwipeOptions>,
  onClose: () => any
};

export type State = {
  current: ?PhotoSwipeItem
};

class Lightbox extends Component {
  props: Props;
  state: State;
  container: ?HTMLElement;
  photoSwipe: ?PhotoSwipe;

  constructor(props: Props) {
    super(props);

    this.state = {
      current: props.items[props.startIndex]
    };
  }

  componentDidMount(): void {
    if (this.container) {
      const photoSwipe = new PhotoSwipe(this.container, PhotoSwipeUI, this.props.items, {
        ...this.props.options,
        index: this.props.startIndex,
        history: false,
        closeOnScroll: false,
        // UI options
        shareEl: false
      });

      photoSwipe.listen('close', this.handleClose);
      photoSwipe.listen('afterChange', this.handleIndexChange);
      photoSwipe.init();

      this.photoSwipe = photoSwipe;
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState.current !== this.state.current;
  }

  componentWillUnmount(): void {
    if (this.photoSwipe) {
      try {
        this.photoSwipe.close();
      } catch (e) {
        // do nothing
      }

      this.photoSwipe = null;
    }
  }

  handleIndexChange = () => {
    if (this.photoSwipe) {
      this.setState({ current: this.photoSwipe.currItem });
    }
  };

  handleClose = (): void => {
    this.photoSwipe = null;
    this.props.onClose();
  };

  setContainer = (container: HTMLElement): void => {
    this.container = container;
  };

  renderDownload(): ?React.Element<any> {
    const { current } = this.state;
    if (!current) {
      return null;
    }

    return (
      <a className={styles.buttonDownload} href={current.src} download={current.src}>
        <Icon glyph="file_download" className={styles.icon} />
      </a>
    );
  }

  render(): React.Element<any> {
    const className = cx('pswp', styles.container, this.props.className);

    return (
      <div
        ref={this.setContainer}
        className={className}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className={cx('pswp__bg', styles.background)} />

        <div className={cx('pswp__scroll-wrap', styles.scroll)}>

          <div className={cx('pswp__container', styles.wrapper)}>
            <div className={cx('pswp__item', styles.item)} />
            <div className={cx('pswp__item', styles.item)} />
            <div className={cx('pswp__item', styles.item)} />
          </div>

          <div className="pswp__ui pswp__ui--hidden">
            <div className={cx('pswp__top-bar', styles.toolbar)}>
              <div className="pswp__counter" />
              <button
                className="pswp__button pswp__button--close"
                title="Close (Esc)"
              />
              <button
                className="pswp__button pswp__button--share"
                title="Share"
              />
              <button
                className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"
              />
              {this.renderDownload()}
              <button
                className="pswp__button pswp__button--zoom"
                title="Zoom in/out"
              />
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
            >
              <div className="pswp__share-tooltip" />
            </div>
            <button
              className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"
            />
            <button
              className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"
            />
            <div className="pswp__caption">
              <div className="pswp__caption__center" />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Lightbox;
