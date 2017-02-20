import React from 'react';
import styles from './ProgressBar.css';
import classNames from 'classnames';

export type Props = {
  playing?: boolean,
  className?: string,
  display: boolean,
  x: number,
}

class ProgressBar extends React.Component {
  props : Props;
  point : HTMLElement;

  static defaultProps = {
    playing: false,
    hovered: false,
    x: 0
  };

  setPoint = (element:HTMLElement) => {
    this.point = element;
  }

  render( ) {
    const className = classNames(styles.pointBar, {
      [ this.props.className ]: this.props.className,
      [ styles.pointShow ]: this.props.display,
    });

    return (
      <div className={className} ref={this.setPoint}>
      </div>
    );
  }

}

export default ProgressBar;
