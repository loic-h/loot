import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const UrlCard = ({
  title,
  description,
  url,
  className
}) => (
  <div className={classnames({
      'url-card': true,
      [className]: className
    })}>
    <a className="url-card__link" href={url} target="blank">
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
