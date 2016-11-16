/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from './types';
import React, { Component } from 'react';
import classNames from 'classnames';
import PhotoSwipe from 'photoswipe';
// import LightboxUI from './LightboxUI';
import PhotoSwipeUI from 'photoswipe/src/js/ui/photoswipe-ui-default';
import LightboxUIComponent from './LightboxUIComponent'

import '!style!css!./Lightbox.global.css';
import styles from './Lightbox.css';

class Lightbox extends Component {
  props : Props;

  constructor(props) {
    super(props);

    this.state = {
      link: props.items[props.index].src
    }

    this.photoswipe = null;
  }

  componentDidMount() {
    console.debug('componentDidMount');
    if (this.props.isOpen) {
      this.handlePhotoSwipeOpen(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.debug('componentWillReceiveProps', nextProps);
    if (nextProps.isOpen) {
      this.handlePhotoSwipeOpen(nextProps);
    }
  }

  handlePhotoSwipeOpen = (props): void => {
    const options = {
      ...props.options,
      index: props.index,
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
      history: false,
      closeOnScroll: false,
      // UI options
      shareEl: false
    };

    this.photoswipe = new PhotoSwipe(this.lightbox, PhotoSwipeUI, props.items, options);
    this.photoswipe.init();
    this.photoswipe.listen('close', this.handlePhotoSwipeClose);
    this.photoswipe.listen('afterChange', this.handleIndexChange);
  };

  handleIndexChange = () => {
    this.setState({ link: this.photoswipe.currItem.src });
  }

  handlePhotoSwipeClose = (): void => {
    console.debug('handlePhotoSwipeClose', this);
    this.props.onClose();
  };

  setGallery = (element): void => {
    this.lightbox = element;
  };

  // renderUI(): ?React.Element<any> {
  //   if (!this.photoswipe) {
  //     return null;
  //   }
  //
  //   return (
  //     <LightboxUIComponent
  //       onPrev={this.photoswipe.prev}
  //       onNext={this.photoswipe.next}
  //       onClose={this.photoswipe.close}
  //       onZoom={this.photoswipe.toggleDesktopZoom}
  //       onDownload={console.debug}
  //     />
  //   );
  // }

  render(): ?React.Element<any> {
    const className = classNames('pswp', styles.container, this.props.className);

    return (
      <div
        ref={this.setGallery}
        className={className}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className={classNames('pswp__bg', styles.background)} />

        <div className={classNames('pswp__scroll-wrap', styles.scroll)}>

          <div className={classNames('pswp__container', styles.wrapper)}>
            <div className={classNames('pswp__item', styles.item)} />
            <div className={classNames('pswp__item', styles.item)} />
            <div className={classNames('pswp__item', styles.item)} />
          </div>

          {/* {this.renderUI()} */}

          <div className="pswp__ui pswp__ui--hidden">
            <div className={classNames('pswp__top-bar', styles.toolbar)}>
              <div className="pswp__counter"/>
              <button className="pswp__button pswp__button--close"
                title="Close (Esc)"/>
              <button className="pswp__button pswp__button--share"
                title="Share"/>
              <button className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"/>
              <button className="pswp__button pswp__button--zoom"
                title="Zoom in/out"/>
              <a
                className={styles.buttonDownload}
                href={this.state.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon glyph="file_download" className={styles.icon} />
              </a>
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"/>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"/>
            </div>
            <button className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"/>
            <button className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"/>
            <div className="pswp__caption">
              <div className="pswp__caption__center"/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Lightbox;
