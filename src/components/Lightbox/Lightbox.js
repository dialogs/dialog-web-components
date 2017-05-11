/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import '!style-loader!css-loader!photoswipe/dist/photoswipe.css';
import '!style-loader!css-loader!photoswipe/dist/default-skin/default-skin.css';

import type { ProviderContext } from '@dlghq/react-l10n';
import type { PhotoSwipeItem, PhotoSwipeOptions, PhotoSwipeThumbBounds } from 'photoswipe';
import { LocalizationContextType } from '@dlghq/react-l10n';
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

type State = {
  current: ?PhotoSwipeItem
};

type Context = ProviderContext;

class Lightbox extends Component {
  props: Props;
  state: State;
  container: ?HTMLElement;
  photoSwipe: ?PhotoSwipe;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: Props, context: Context) {
    super(props, context);

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
        hideAnimationDuration: 150,
        showAnimationDuration: 150,
        bgOpacity: 0.8,
        // UI options
        shareEl: false,
        getThumbBoundsFn: this.getThumbBounds
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

  getThumbBounds = (index: number): ?PhotoSwipeThumbBounds => {
    const item = this.props.items[index];
    if (item) {
      const thumbnail = document.getElementById(item.id);
      if (thumbnail) {
        const pageYScroll = window.pageYOffset || 0;
        const rect = thumbnail.getBoundingClientRect();
        if (rect) {
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          };
        }
      }
    }

    return null;
  };

  setContainer = (container: HTMLElement): void => {
    this.container = container;
  };

  renderDownload(): ?React.Element<any> {
    const { current } = this.state;
    const { l10n } = this.context;

    if (!current) {
      return null;
    }

    return (
      <a
        className={styles.buttonDownload}
        href={current.src}
        download={current.src}
        title={l10n.formatText('Lightbox.download')}
      >
        <Icon glyph="file_download" className={styles.icon} size={20} />
      </a>
    );
  }

  render(): React.Element<any> {
    const className = cx('pswp', styles.container, this.props.className);
    const { l10n } = this.context;

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
              <button className="pswp__button pswp__button--close" title={l10n.formatText('Lightbox.close')} />
              <button className="pswp__button pswp__button--share" title={l10n.formatText('Lightbox.share')} />
              <button className="pswp__button pswp__button--fs" title={l10n.formatText('Lightbox.fullscreen')} />
              {this.renderDownload()}
              <button className="pswp__button pswp__button--zoom" title={l10n.formatText('Lightbox.zoom')} />
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip" />
            </div>
            <button
              className={cx('pswp__button pswp__button--arrow--left', styles.button)}
              title={l10n.formatText('Lightbox.prev')}
            >
              <Icon glyph="arrow_left" className={styles.arrowIcon} size={42} />
            </button>
            <button
              className={cx('pswp__button pswp__button--arrow--right', styles.button)}
              title={l10n.formatText('Lightbox.next')}
            >
              <Icon glyph="arrow_right" className={styles.arrowIcon} size={42} />
            </button>
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
