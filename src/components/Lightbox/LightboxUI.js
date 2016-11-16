import styles from './Lightbox.css';

class LightboxUI {
  constructor(pswp, framework) {
    console.debug('LightboxUI constructor', pswp, framework);
    this.pswp = pswp;
    this.framework = framework;
    this.options = this.pswp.options;
    this.defaultOptions = {
      barsSize: {
        top: 74,
        bottom: 'auto'
      },
      closeElClasses: [
        styles.item,
        styles.caption,
        styles.zoomWrap,
        styles.ui,
        styles.toolbar
      ],
      timeToIdle: 4000,
      timeToIdleOutside: 1000,
      loadingIndicatorDelay: 1000,
      addCaptionHTMLFn: this.addCaptionHTML,
      closeEl: true,
      captionEl: true,
      fullscreenEl: true,
      zoomEl: true,
      shareEl: true,
      counterEl: true,
      arrowEl: true,
      preloaderEl: true,
      tapToClose: false,
      tapToToggleControls: true,
      clickToCloseNonZoomable: true,
      shareButtons: [
        {
          id: 'facebook',
          label: 'Share on Facebook',
          url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}'
        }, {
          id: 'twitter',
          label: 'Tweet',
          url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'
        }, {
          id: 'pinterest',
          label: 'Pin it',
          url: 'http://www.pinterest.com/pin/create/button/' + '?url={{url}}&media={{image_url}}&description={{text}}'
        }, {
          id: 'download',
          label: 'Download image',
          url: '{{raw_image_url}}',
          download: true
        }
      ],
      getImageURLForShare: function(/* shareButtonData */) {
        return pswp.currItem.src || '';
      },
      getPageURLForShare: function(/* shareButtonData */) {
        return window.location.href;
      },
      getTextForShare: function(/* shareButtonData */) {
        return pswp.currItem.title || '';
      },
      indexIndicatorSep: ' / ',
      fitControlsWidth: 1200
    };
    this.isControlsVisible = false;
    this.isOverlayUpdated = false;
    this.idleIncrement = 0;

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.unbindEvents = this.unbindEvents.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.setupUIElements = this.setupUIElements.bind(this);
    this.hideControls = this.hideControls.bind(this);
    this.showControls = this.showControls.bind(this);
    this.countNumItems = this.countNumItems.bind(this);
    this.setupIdle = this.setupIdle.bind(this);
    this.setIdle = this.setIdle.bind(this);
    this.setupLoadingIndicator = this.setupLoadingIndicator.bind(this);
    this.toggleLoadingIndicator = this.toggleLoadingIndicator.bind(this);
    this.hasCloseClass = this.hasCloseClass.bind(this);
    this.fitControlsInViewport = this.fitControlsInViewport.bind(this);
    // this.applyNavBarGaps = this.applyNavBarGaps.bind(this);
    this.handleDoubleTap = this.handleDoubleTap.bind(this);
    this.handleControlTap = this.handleControlTap.bind(this);
    this.handleGlobalTap = this.handleGlobalTap.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleIdleMouseMove = this.handleIdleMouseMove.bind(this);
    this.handlMouseLeaveWindow = this.handlMouseLeaveWindow.bind(this);

    this.uiElements = [{
      name: 'title',
      className: styles.title,
      option: 'captionEl',
      onInit: (element) => {
        console.debug('this.titleContainer')
        this.titleContainer = element
      }
    },{
      name: 'counter',
      className: styles.counter,
      option: 'counterEl',
      onInit: (element) => {
        console.debug('this.indexIndicator')
        this.indexIndicator = element
      }
    },{
      name: 'button--zoom',
      className: styles.buttonZoom,
      option: 'zoomEl',
      onTap: this.pswp.toggleDesktopZoom
    },{
      name: 'button--close',
      className: styles.buttonClose,
      option: 'closeEl',
      onTap: this.pswp.close
    }, {
      name: 'button--arrow--left',
      className: styles.buttonPrev,
      option: 'arrowEl',
      onTap: this.pswp.prev
    }, {
      name: 'button--arrow--right',
      className: styles.buttonNext,
      option: 'arrowEl',
      onTap: this.pswp.next
    },{
      name: 'preloader',
      className: styles.preloader,
      option: 'preloaderEl',
      onInit: (element) => {
        console.debug('this.loadingIndicator')
        this.loadingIndicator = element
      }
    }];

    console.debug('LightboxUI constructor end', this);
  }

  init() {
    console.debug('LightboxUI init()', this);
    this.framework.extend(this.options, this.defaultOptions, true);
    this.controls = this.framework.getChildByClass(this.pswp.scrollWrap, styles.ui);

    this.pswp.listen('beforeChange', this.update);
    this.pswp.listen('doubleTap', this.handleDoubleTap);
    this.pswp.listen('preventDragEvent', (event) => {
      // console.debug('preventDragEvent', event, isDown, preventObj);
      const target = event.target;
      if (target && target.getAttribute('class') && event.type.indexOf('mouse') > -1 && (target.className.indexOf(styles.title) > 0 || (/(SMALL|STRONG|EM)/i).test(target.tagName))) {
        preventObj.prevent = false;
      }
    });
    this.pswp.listen('bindEvents', this.bindEvents);
    this.pswp.listen('unbindEvents', this.unbindEvents);
    this.pswp.listen('destroy', () => {
      // console.debug('destroy');
      if (this.options.captionEl) {
        if (this.fakeCaptionContainer) {
          this.controls.removeChild(this.fakeCaptionContainer);
        }
        this.framework.removeClass(this.titleContainer, styles.titleEmpty);
      }

      this.framework.removeClass(this.controls, styles.overClose);
      this.framework.addClass(this.controls, styles.uiHidden);
      this.setIdle(false);
    });

    if (!this.options.showAnimationDuration) {
      console.debug('this.controls', this.controls, styles.uiHidden)
      this.framework.removeClass(this.controls, styles.uiHidden);
    }

    this.pswp.listen('initialZoomIn', () => {
      console.debug('initialZoomIn');
      if (this.options.showAnimationDuration) {
        this.framework.removeClass(this.controls, styles.uiHidden);
      }
    });
    this.pswp.listen('initialZoomOut', () => {
      console.debug('initialZoomOut');
      this.framework.addClass(this.controls, styles.uiHidden);
    });
    // this.pswp.listen('parseVerticalMargin', this.applyNavBarGaps);

    this.setupUIElements()
    this.countNumItems()
    this.setupIdle()
    this.setupLoadingIndicator()
  }

  update() {
    console.debug('LightboxUI update()', this);

    if (this.controlsVisible && this.pswp.currItem) {
      this.updateIndex();

      if (this.options.captionEl) {
        this.options.addCaptionHTMLFn(this.pswp.currItem, this.titleContainer);

        this.togglePswpClass(this.titleContainer, styles.titleEmpty, !pswp.currItem.title);
      }

      this.isOverlayUpdated = true;

    } else {
      this.isOverlayUpdated = false;
    }
  }

  togglePswpClass(element, className, isAdded = false) {
    console.debug('togglePswpClass', element, className, isAdded);
    this.framework[`${isAdded ? 'add' : 'remove'}Class`](element, className);
  }

  hasCloseClass(target) {
    // console.debug('hasCloseClass', target);
    for (let i in this.options.closeElClasses) {
      if (this.framework.hasClass(target, this.options.closeElClasses[i])) {
        return true;
      }
    }
  }

  fitControlsInViewport() {
    return !this.pswp.likelyTouchDevice || this.options.mouseUsed || screen.width > this.options.fitControlsWidth;
  }

  addCaptionHTML(item, element) {
    // console.debug('addCaptionHTML', item, element);
    if (!item.title) {
      element.children[0].innerHTML = '';
      return false;
    }

    element.children[0].innerHTML = item.title;
    return true;
  }

  updateIndex() {
    console.debug('updateIndex', this);
    if (this.options.counterEl) {
      this.indexIndicator.innerHTML = (this.pswp.getCurrentIndex() + 1) + this.options.indexIndicatorSep + this.options.getNumItemsFn();
    }
  }

  showControls() {
    // console.debug('showControls');
    if (!this.isOverlayUpdated) {
      this.update();
    }

    this.isControlsVisible = true;
    this.framework.removeClass(this.controls, styles.uiHidden);
  }

  hideControls() {
    // console.debug('hideControls');
    this.isControlsVisible = false;
    this.framework.addClass(this.controls, styles.uiHidden);
  }

  handleMouseOver(event) {
    console.debug('handleMouseOver', event);
    this.togglePswpClass(this.controls, styles.overClose, this.hasCloseClass(event.target));
  }

  bindEvents() {
    console.debug('bindEvents')
    this.framework.bind(this.controls, 'pswpTap click', this.handleControlTap);
    this.framework.bind(this.pswp.scrollWrap, 'pswpTap', this.handleGlobalTap);

    if (!this.pswp.likelyTouchDevice) {
      this.framework.bind(this.pswp.scrollWrap, 'mouseover', this.handleMouseOver);
    }
  }

  unbindEvents() {
    console.debug('unbindEvents')
    if (this.idleInterval) {
      clearInterval(this.idleInterval);
    }

    this.framework.unbind(document, 'mouseout', this.handlMouseLeaveWindow);
    this.framework.unbind(document, 'mousemove', this.handleIdleMouseMove);
    this.framework.unbind(this.controls, 'pswpTap click', this.handleControlTap);
    this.framework.unbind(this.pswp.scrollWrap, 'pswpTap', this.handleGlobalTap);
    this.framework.unbind(this.pswp.scrollWrap, 'mouseover', this.handleMouseOver);
  }

  handleControlTap(event) {
    console.debug('handleControlTap');
    if (this.blockControlsTap) {
      return true;
    }

    if (this.options.timeToIdle && this.options.mouseUsed && !this.isIdle) {
      // reset idle timer
      this.handleIdleMouseMove();
    }

    let uiElement;
    let clickedClass = event.target.className || '';
    let found;

    for (let uiElement of this.uiElements) {
      if (uiElement.onTap && clickedClass.indexOf(uiElement.className) > -1) {
        uiElement.onTap();
        found = true;
      }
    }

    if (found) {
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      this.blockControlsTap = true;

      this.blockControlsTapTimeout = setTimeout(() => {
        this.blockControlsTap = false;
      }, 30);
    }
  }

  handleGlobalTap(event) {
    console.debug('handleGlobalTap');

    if (this.blockControlsTap) {
      return;
    }

    if (event.detail && event.detail.pointerType === 'mouse') {
      const target = event.target;

      // close gallery if clicked outside of the image
      if (this.hasCloseClass(target)) {
        this.pswp.close();
        return;
      }

      if (this.framework.hasClass(target, 'pswp__img')) {
        if (this.pswp.getZoomLevel() === 1 && this.pswp.getZoomLevel() <= this.pswp.currItem.fitRatio) {
          if (this.options.clickToCloseNonZoomable) {
            this.pswp.close();
          }
        } else {
          this.pswp.toggleDesktopZoom(event.detail.releasePoint);
        }
      }

    } else {

      // tap anywhere (except buttons) to toggle visibility of controls
      if (this.options.tapToToggleControls) {
        if (this.controlsVisible) {
          this.hideControls();
        } else {
          this.showControls();
        }
      }

      // tap to close gallery
      if (this.options.tapToClose && (this.framework.hasClass(target, 'pswp__img') || this.hasCloseClass(target))) {
        this.pswp.close();
        return;
      }
    }
  }

  handleMouseOver(event) {
    console.debug('handleMouseOver');
    this.togglePswpClass(this.controls, styles.overClose, this.hasCloseClass(event.target));
  }

  handleIdleMouseMove() {
    console.debug('handleIdleMouseMove');
    clearTimeout(this.idleTimer);
    this.idleIncrement = 0;

    if (this.isIdle) {
      this.setIdle(false);
    }
  }

  handlMouseLeaveWindow(event) {
    // console.debug('handlMouseLeaveWindow', event);
    var from = event.relatedTarget || event.toElement;
    if (!from || from.nodeName === 'HTML') {
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        this.setIdle(true);
      }, this.options.timeToIdleOutside);
    }
  }

  countNumItems() {
    // console.debug('countNumItems');
    var hasOneSlide = (this.options.getNumItemsFn() === 1);

    if (hasOneSlide !== this.galleryHasOneSlide) {
      this.togglePswpClass(this.controls, styles.oneSlide, hasOneSlide);
      this.galleryHasOneSlide = hasOneSlide;
    }
  }

  setupLoadingIndicator() {
    // console.debug('setupLoadingIndicator');
    if (this.options.preloaderEl) {
      this.toggleLoadingIndicator(true);
      this.pswp.listen('beforeChange', () => {
        // console.debug('setupLoadingIndicator beforeChange');
        clearTimeout(this.loadingIndicatorTimeout);

        this.loadingIndicatorTimeout = setTimeout(() => {
          if (this.pswp.currItem && this.pswp.currItem.loading) {
            if (!this.pswp.allowProgressiveImg() || (this.pswp.currItem.img && !this.pswp.currItem.img.naturalWidth)) {
              this.toggleLoadingIndicator(false);
            }
          } else {
            this.toggleLoadingIndicator(true);
          }
        }, this.options.loadingIndicatorDelay);

      });
      this.pswp.listen('imageLoadComplete', (index, item) => {
        console.debug('imageLoadComplete');
        if (this.pswp.currItem === item) {
          this.toggleLoadingIndicator(true);
        }
      });
    }
  }

  toggleLoadingIndicator(hide) {
    console.debug('toggleLoadingIndicator', hide);
    if (this.loadingIndicatorHidden !== hide) {
      this.togglePswpClass(this.loadingIndicator, styles.preloaderActive, !hide);
      this.loadingIndicatorHidden = hide;
    }
  }

  setupIdle() {
    // console.debug('setupIdle', this);
    if (this.options.timeToIdle) {
      this.pswp.listen('mouseUsed', () => {
        this.framework.bind(document, 'mousemove', this.handleIdleMouseMove);
        this.framework.bind(document, 'mouseout', this.handlMouseLeaveWindow);

        this.idleInterval = setInterval(() => {
          this.idleIncrement++;
          if (this.idleIncrement === 2) {
            this.setIdle(true);
          }
        }, this.options.timeToIdle / 2);
      });
    }
  }

  setIdle(isIdle) {
    console.debug('setIdle', isIdle);
    this.isIdle = isIdle;
    this.togglePswpClass(this.controls, styles.uiIdle, isIdle);
  }

  setupUIElements() {
    // console.debug('setupUIElements')
    const loopThroughChildElements = (children) => {
      // console.debug('loopThroughChildElements', children);
      let item, classAttr, uiElement;

      if (!children) {
        return;
      }

      for (let child of children) {
        classAttr = child.className;
        for (let uiElement of this.uiElements) {
          if (classAttr.indexOf(uiElement.className) > -1) {
            if (this.options[uiElement.option]) {
              this.framework.removeClass(child, styles.elementDisabled);
              if (uiElement.onInit) {
                uiElement.onInit(child);
              }
            } else {
              this.framework.addClass(child, styles.elementDisabled);
            }
          }
        }
      }
    };

    loopThroughChildElements(this.controls.children);

    const toolbar = this.framework.getChildByClass(this.controls, styles.toolbar);
    if (toolbar) {
      loopThroughChildElements(toolbar.children);
    }
  }

  handleDoubleTap(point) {
    console.debug('handleDoubleTap', point);
    var initialZoomLevel = this.pswp.currItem.initialZoomLevel;
    console.debug(initialZoomLevel)
    if (this.pswp.getZoomLevel() !== initialZoomLevel) {
      this.pswp.zoomTo(initialZoomLevel, point, 333);
    } else {
      this.pswp.zoomTo(this.options.getDoubleTapZoom(false, this.pswp.currItem), point, 333);
    }
  }

  // applyNavBarGaps(item) {
  //   var gap = item.vGap;
  //
  //   if (this.fitControlsInViewport()) {
  //
  //     var bars = this.options.barsSize;
  //     if (this.options.captionEl && bars.bottom === 'auto') {
  //       if (!this.fakeCaptionContainer) {
  //         this.fakeCaptionContainer = this.framework.createEl(`${styles.titleEmpty} ${styles.titleEmpty}`);
  //         this.fakeCaptionContainer.appendChild(this.framework.createEl(styles.titleCenter));
  //         this.controls.insertBefore(this.fakeCaptionContainer, this.titleContainer);
  //         this.framework.addClass(this.controls, styles.uiFit);
  //       }
  //       if (this.options.addCaptionHTMLFn(item, this.fakeCaptionContainer, true)) {
  //
  //         var captionSize = this.fakeCaptionContainer.clientHeight;
  //         gap.bottom = parseInt(captionSize, 10) || 44;
  //       } else {
  //         gap.bottom = bars.top; // if no cap  tion, set size of bottom gap to size of top
  //       }
  //     } else {
  //       gap.bottom = bars.bottom === 'auto'
  //         ? 0
  //         : bars.bottom;
  //     }
  //
  //     // height of top bar is static, no need to calculate it
  //     gap.top = bars.top;
  //   } else {
  //     gap.top = gap.bottom = 0;
  //   }
  // }
}

export default LightboxUI;
