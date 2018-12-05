/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Range from '../Range/Range';
import styles from './ImageEdit.css';
import { Croppie } from 'croppie';
import { listen, fileToBase64 } from '@dlghq/dialog-utils';
import HotKeys from '../HotKeys/HotKeys';

type FooterRendererProps = {
  submit: () => mixed,
};

type ControlsRendererProps = {
  rotateLeft: () => mixed,
  rotateRight: () => mixed,
  zoom: {
    onChange: (value: number) => mixed,
    value: number,
  },
};

export type Props = {
  className?: string,
  image: File,
  type: 'circle' | 'square',
  size: number,
  height: number,
  maxZoom: number,
  onSubmit: (image: File) => mixed,
  renderFooter?: (footerRendererProps: FooterRendererProps) => Node,
  renderControls?: (controlsRendererProps: ControlsRendererProps) => Node,
};

export type State = {
  zoom: number,
  minZoom: number,
};

class ImageEdit extends PureComponent<Props, State> {
  croppieElement: ?HTMLElement;
  croppie: ?Object;
  listeners: ?({ remove(): void }[]);

  static defaultProps = {
    type: 'circle',
    size: 250,
    height: 400,
    maxZoom: 2,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      zoom: 0,
      minZoom: 0,
    };

    this.croppie = null;
    this.listeners = null;
  }

  componentDidMount() {
    if (this.croppieElement) {
      this.croppie = new Croppie(this.croppieElement, {
        viewport: {
          width: this.props.size,
          height: this.props.size,
          type: this.props.type,
        },
        showZoomer: false,
        enableOrientation: true,
        customClass: styles.cropper,
        maxZoom: this.props.maxZoom,
      });

      fileToBase64(this.props.image, (image) => {
        if (this.croppie) {
          this.croppie
            .bind({
              url: image,
              zoom: 0,
            })
            .then(() => {
              this.setState(({ zoom }) => {
                const currentZoom = this.croppie
                  ? this.croppie._currentZoom
                  : zoom;

                return {
                  zoom: currentZoom,
                  minZoom: currentZoom,
                };
              });
            });
        }
      });

      this.listeners = [
        listen(this.croppieElement, 'update', this.handleCroppieUpdate, {
          capture: false,
          passive: true,
        }),
      ];
    }
  }

  componentWillUnmount() {
    this.removeListeners();
    if (this.croppie) {
      this.croppie.destroy();
      this.croppie = null;
    }
  }

  handleSubmit = (): void => {
    if (this.croppie) {
      this.croppie
        .result({
          type: 'blob',
          size: 'viewport',
          format: 'png',
          circle: false,
        })
        .then((blob) => {
          this.props.onSubmit(
            new File([blob], `${new Date().toISOString()}.png`),
          );
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  };

  handleRotateLeft = (): void => {
    if (this.croppie) {
      this.croppie.rotate(90);
    }
  };

  handleRotateRight = (): void => {
    if (this.croppie) {
      this.croppie.rotate(-90);
    }
  };

  handleCroppieUpdate = (event: $FlowIssue) => {
    this.setState({ zoom: event.detail.zoom });
  };

  handleZoomChange = (value: number) => {
    if (this.croppie) {
      this.croppie.setZoom(value);
    }
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit();
    }
  };

  setCropper = (cropper: ?HTMLElement): void => {
    if (cropper) {
      this.croppieElement = cropper;
    }
  };

  removeListeners = (): void => {
    if (this.listeners) {
      this.listeners.forEach((listener) => listener.remove());
      this.listeners = null;
    }
  };

  renderControls(): Node {
    if (this.props.renderControls) {
      return this.props.renderControls({
        rotateLeft: this.handleRotateLeft,
        rotateRight: this.handleRotateRight,
        zoom: {
          onChange: this.handleZoomChange,
          value: this.state.zoom,
          minZoom: this.state.minZoom,
        },
      });
    }

    return (
      <div className={styles.controls}>
        <Icon
          size={30}
          glyph="rotate_left"
          onClick={this.handleRotateLeft}
          className={styles.rotateLeft}
        />
        <Icon
          size={30}
          glyph="rotate_right"
          onClick={this.handleRotateRight}
          className={styles.rotateRight}
        />
        <Range
          min={this.state.minZoom}
          max={this.props.maxZoom}
          value={this.state.zoom}
          step={0.001}
          onChange={this.handleZoomChange}
          className={styles.zoom}
        />
      </div>
    );
  }

  renderFooter(): Node {
    if (this.props.renderFooter) {
      return this.props.renderFooter({ submit: this.handleSubmit });
    }

    return (
      <Button wide theme="primary" rounded={false} onClick={this.handleSubmit}>
        <Text id="ImageEdit.save" />
      </Button>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <div className={className}>
          <div className={styles.body}>
            <div ref={this.setCropper} style={{ height: this.props.height }} />
            {this.renderControls()}
          </div>
          <div className={styles.footer}>{this.renderFooter()}</div>
        </div>
      </HotKeys>
    );
  }
}

export default ImageEdit;
