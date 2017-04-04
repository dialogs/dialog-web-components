/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Range from '../Range/Range';
import styles from './ImageEdit.css';
import Croppie from 'croppie';
import { listen, fileToBase64 } from '@dlghq/dialog-utils';
import format from 'date-fns/format';

export type Props = {
  className?: string,
  image: File,
  type: 'circle' | 'square',
  size: number,
  height: number,
  onSubmit: (image: File) => any
};

export type State = {
  zoom: {
    min: number,
    max: number,
    current: number
  }
};

class ImageEdit extends PureComponent {
  props: Props;
  state: State;
  croppieElement: ?HTMLElement;
  croppie: ?Object;
  listeners: ?{ remove(): void }[];

  static defaultProps = {
    type: 'circle',
    size: 250,
    height: 400
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      zoom: {
        min: 0,
        max: 1.5,
        current: 0
      }
    };

    this.croppie = null;
    this.listeners = null;
  }

  componentDidMount() {
    if (this.croppieElement) {
      const croppie = new Croppie(this.croppieElement, {
        viewport: {
          width: this.props.size,
          height: this.props.size,
          type: this.props.type
        },
        showZoomer: false,
        enableOrientation: true,
        customClass: styles.cropper
      });

      fileToBase64(this.props.image, (image) => {
        croppie.bind({
          url: image,
          zoom: 0
        }).then(() => {
          this.setState({
            zoom: {
              ...this.state.zoom,
              min: croppie._currentZoom,
              current: croppie._currentZoom
            }
          });
        });
      });

      this.croppie = croppie;
      this.listeners = [
        listen(this.croppieElement, 'update', this.handleCroppieUpdate, { capture: false, passive: true })
      ];
    }
  }

  componentWillUnmount() {
    this.removeListeners();
    if (this.croppie) {
      this.croppie.destroy();
    }
  }

  handleSubmit = (): void => {
    if (this.croppie) {
      this.croppie.result({
        type: 'blob',
        size: 'original',
        format: 'png',
        circle: false
      }).then((blob) => {
        const fileName = format(new Date(), 'YYYY.MM.DD-HH:mm:ss.SSS');
        this.props.onSubmit(new File([blob], `${fileName}.png`));
      });
    }
  };

  handleRotateLeft = (): void => {
    if (this.croppie) {
      this.croppie.rotate(-90);
    }
  };

  handleRotateRight = (): void => {
    if (this.croppie) {
      this.croppie.rotate(90);
    }
  };

  handleCroppieUpdate = (event: $FlowIssue) => {
    this.setState({
      zoom: {
        ...this.state.zoom,
        current: event.detail.zoom
      }
    });
  };

  handleZoomChange = (value: number) => {
    if (this.croppie) {
      this.croppie.setZoom(value);
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

  renderControls() {
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
          min={this.state.zoom.min}
          max={this.state.zoom.max}
          value={this.state.zoom.current}
          step={0.005}
          onChange={this.handleZoomChange}
          className={styles.zoom}
        />
      </div>
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.body} style={{ height: this.props.height }}>
          <div ref={this.setCropper} />
          {this.renderControls()}
        </div>
        <div className={styles.footer}>
          <Button
            wide
            theme="primary"
            rounded={false}
            onClick={this.handleSubmit}
          >
            <Text id="ImageEdit.save" />
          </Button>
        </div>
      </div>
    );
  }
}

export default ImageEdit;
