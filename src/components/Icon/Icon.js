/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

/* eslint max-len: 0 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Icon.css';

/**
 * Simple icon component
 *
 * Used to display Google Material Icons
 */
class Icon extends Component {
  static propTypes = {

    /**
     * Class name which will be added to icon `classNames`
     */
    className: PropTypes.string,

    /**
     * Glyph for rendering
     */
    glyph: PropTypes.string.isRequired,

    /**
     * Click handler function, which will be executed when icon is clicked
     */
    onClick: PropTypes.func,
    theme: PropTypes.oneOf(['primary', 'success', 'danger', 'info', 'warning']),
    inverted: PropTypes.bool
  };

  static defaultProps = {
    inverted: false
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.glyph !== this.props.glyph ||
           nextProps.onClick !== this.props.onClick ||
           nextProps.theme !== this.props.theme ||
           nextProps.inverted !== this.props.inverted ||
           nextProps.className !== this.props.className;
  }

  renderMaterialIcon() {
    const { glyph } = this.props;
    const className = classNames('material-icons', styles.material);

    return (
      <i className={className}>{glyph}</i>
    );
  }

  renderSvgIcon() {
    const { glyph } = this.props;

    switch (glyph) {
      case 'apple':
        return (
          <svg viewBox="0 0 32 32" className={styles.svg}>
            <g transform="translate(2.000000, 1.000000)">
              <path d="M24.3496597,9.88322937 C22.7905668,7.61011118 20.3740244,7.29953079 19.5248295,7.27476691 C17.4952228,7.0611784 15.526494,8.48922907 14.4926018,8.48922907 C13.4380731,8.48922907 11.8459616,7.29540348 10.1300309,7.33048564 C7.92191781,7.36453599 5.85619712,8.64297153 4.7232494,10.6282096 C2.38512598,14.6760728 4.12891617,20.6245643 6.36901589,23.8964925 C7.48958166,25.4989222 8.79897205,27.2881128 10.5128392,27.2241395 C12.1895606,27.1560388 12.8158805,26.1561969 14.8392962,26.1561969 C16.844139,26.1561969 17.4322813,27.2241395 19.1801988,27.1838982 C20.9797077,27.1560388 22.1126554,25.5752775 23.1940117,23.9573704 C24.4889565,22.1217475 25.0089981,20.3119202 25.0296346,20.2190557 C24.9883615,20.2056419 21.5358633,18.8869651 21.5007811,14.9020433 C21.4708581,11.57646 24.2237766,9.95855289 24.3496597,9.88322937 L24.3496597,9.88322937 Z M17.0495121,5.12237262 C17.9513301,3.99458405 18.5683636,2.46025505 18.3970801,0.903225806 C17.091817,0.961008205 15.4594642,1.80607576 14.5194685,2.90910045 C13.6878147,3.88108291 12.9448982,5.47422614 13.1368183,6.97244115 C14.6030466,7.08181497 16.1084845,6.2326201 17.0495121,5.12237262 L17.0495121,5.12237262 Z" />
            </g>
          </svg>
        );
      case 'logo':
        return (
          <svg viewBox="0 0 32 32" className={styles.svg}>
            <path d="M7.39664743,5.39698047 C11.9259548,0.867673177 19.2692052,0.867673177 23.7985125,5.39698047 C28.3278197,9.92673181 28.3278197,17.2690942 23.7985125,21.7984014 L15.597358,30 L15.597358,25.195382 C12.6293295,25.195382 9.66130108,24.0630551 7.39664743,21.7984014 C2.86778419,17.2699822 2.86778419,9.92673181 7.39664743,5.39698047" transform="translate(0, 2)" />
          </svg>
        );
      case 'phone':
        return (
          <svg viewBox="0 0 32 32" className={styles.svg}>
            <g transform="translate(3.000000, 2.000000)">
              <path d="M14.5022222,22.4325926 L18.0812721,24.1988748 C18.4412722,23.8388749 18.3288889,19.0192593 18.7955555,19.1792592 C20.2888889,19.6725926 21.9022222,19.9392593 23.5555555,19.9392593 C24.2888889,19.9392593 24.8888889,20.5392593 24.8888889,21.2725925 L23.7336158,25.1560689 C23.7336158,25.8894022 23.7153216,25.925927 22.9819883,25.925927 C22.1906867,25.925927 21.9824331,27.2187272 21.2120552,27.1396256 C10.8614636,26.0768378 2.57657017,18.0515217 1.11734745,7.82364991 C0.966784643,6.76833663 1.29709201,5.68111108 1.29709201,4.58412904 C1.29709201,4.31698114 1.21719272,4.95890428 1.67005603,5.87225504 C1.75273533,6.03900559 1.83956642,6.21508542 1.92930945,6.39671722 C2.69735047,7.95116312 3.6786707,9.91225407 4.09608289,9.91225407 L5.71555555,13.6459259 C7.63555551,17.4192593 10.7288889,20.4992593 14.5022222,22.4325926 L14.5022222,22.4325926 Z" />
              <path d="M6.36724192,11.61131 C9.68095043,11.61131 11.5578345,7.77602359 11.0147028,4.63588687 C10.4715713,1.49575014 8.49777569,0.604962379 5.1886936,0.604962379 C1.87961152,0.604962379 0.594292533,4.28058088 1.0985243,7.45310692 C1.60275608,10.625633 3.05353341,11.61131 6.36724192,11.61131 L6.36724192,11.61131 Z" />
              <path d="M21.1910435,27.1633757 C24.5047521,27.1633757 26.3606638,24.0996903 25.7553585,20.61206 C25.1500531,17.1244298 22.7777379,16.8106279 19.9667028,16.5964353 C17.1556676,16.3822425 15.3141961,19.4608557 15.8184279,22.6333817 C16.3226597,25.8059078 17.877335,27.1633757 21.1910435,27.1633757 L21.1910435,27.1633757 Z" transform="translate(20.802145, 21.874624) scale(-1, -1) translate(-20.802145, -21.874624)" />
            </g>
          </svg>
        );
      case 'more':
        return (
          <svg viewBox="0 0 32 32" className={styles.svg}>
            <g transform="translate(7.000000, 14.000000)">
              <circle cx="2.5" cy="2.5" r="2.5" />
              <circle cx="9.5" cy="2.5" r="2.5" />
              <circle cx="16.5" cy="2.5" r="2.5" />
            </g>
          </svg>
        );
      default:
        return this.renderMaterialIcon();
    }
  }

  renderGlyph() {
    const { glyph } = this.props;

    switch (glyph) {
      case 'logo':
      case 'phone':
      case 'phone_outline':
      case 'apple':
      case 'more':
        return this.renderSvgIcon();
      default:
        return this.renderMaterialIcon()
    }
  }

  render() {
    const { onClick, theme, inverted } = this.props;
    const className = classNames(styles.container, {
      [styles[theme]]: theme,
      [styles.inverted]: inverted,
      [styles.clickable]: onClick
    }, this.props.className);

    return (
      <div className={className} onClick={onClick}>
        {this.renderGlyph()}
      </div>
    );
  }
}

export default Icon;
