import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const UrlCard = ({
  title,
  description,
  url,
  image,
  className
}) => (
  <div className={classnames({
      'url-card': true,
      [className]: className
    })}>
    <a className="url-card__link" href={url} target="blank">
      { image && (
        <figure className="url-card__figure">
          <img className="url-card__image" src={ image } alt={ title }/>
        </figure>
      ) }
      <div className="url-card__content">
        { title && (
          <div className="url-card__title">
            { title }
          </div>
        ) }
        { description && (
          <div className="url-card__description">
            { description }
          </div>
        ) }
      </div>
    </a>
  </div>
);

UrlCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string
};

export default UrlCard;
