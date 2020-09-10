import React from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ src, srcOriginal, id, alt, getLargeImageURL }) {
  const handleClick = evt => getLargeImageURL(evt.target.dataset.source);

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        data-source={srcOriginal}
        data-id={id}
        className={styles.ImageGalleryItemImage}
        onClick={handleClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  srcOriginal: PropTypes.string.isRequired,
  id: PropTypes.number,
  alt: PropTypes.string,
  getLargeImageURL: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
