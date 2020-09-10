import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import styles from './App.module.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const API_KEY = `17974776-5c72563f75cc468bf0b4b15b3`;

class App extends Component {
  state = {
    query: '',
    isLoading: false,
    images: [],
    page: 1,
    error: null,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchPictures();
    }
  }

  fetchPictures = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(res => res.data.hits)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleQuery = e => {
    this.setState({ query: e, currentPage: 1, images: [] });
  };

  largeImgURL = url => {
    this.setState({ largeImageURL: url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { isLoading, images, showModal, largeImageURL } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleQuery} />
        <ImageGallery images={images} onImageClick={this.largeImgURL} />
        {showModal && (
          <Modal images={largeImageURL} toggleModal={this.toggleModal}></Modal>
        )}
        <div className={styles.spinnerAndBtnContainer}>
          {isLoading && (
            <Loader
              type="ThreeDots"
              color="#303f9f"
              height={60}
              width={60}
              timeout={3000}
            />
          )}
          {images.length > 0 && !isLoading && (
            <Button onClick={this.fetchPictures} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
