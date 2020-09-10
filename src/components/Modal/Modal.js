import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalOnEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalOnEscape);
  }

  closeModal = event => {
    if (event.currentTarget === event.target) {
      this.props.toggleModal();
    }
  };

  closeModalOnEscape = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.closeModal}>
        <div className={styles.Modal}>
          <img src={this.props.images} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  images: PropTypes.string.isRequired,
};

export default Modal;
