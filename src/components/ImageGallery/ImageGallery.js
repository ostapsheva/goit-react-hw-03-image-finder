import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          src={el.webformatURL}
          srcOriginal={el.largeImageURL}
          id={el.id}
          alt={el.tags}
          getLargeImageURL={onImageClick}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
