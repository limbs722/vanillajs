const Modal = () => {
    const modalWrapper = document.createElement('div');
    const modalHeaderWrapper = document.createElement('div');
    const modalHeaderContent = document.createElement('div');
    const modalContentWrapper = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalTitle = document.createElement('div');
    const closeButton = document.createElement('button');
    const contentImageWrapper = document.createElement('div');
    const contentImage = document.createElement('img');

    modalWrapper.className = 'wrapper-modal';
    modalWrapper.id = '#modal';
    modalHeaderWrapper.className = 'wrapper-modal-header';
    modalHeaderContent.className = 'modal-header-content';
    modalContentWrapper.className = 'wrapper-modal-content';
    modalContent.className = 'modal-content';
    contentImageWrapper.className = 'content-image-wrapper';
    contentImage.className = 'content-image';

    closeButton.className = 'button-close';
    closeButton.textContent = 'X';
    modalTitle.className = 'modal-title';

    modalWrapper.appendChild(modalHeaderWrapper);
    modalWrapper.appendChild(modalContentWrapper);
    modalHeaderWrapper.appendChild(modalHeaderContent);
    modalHeaderContent.appendChild(modalTitle);
    modalHeaderContent.appendChild(closeButton);
    modalContentWrapper.appendChild(modalContent);
    modalContent.appendChild(contentImageWrapper);
    contentImageWrapper.appendChild(contentImage);

    closeButton.addEventListener('click', () => {
        modalWrapper.style.display = 'none';
    });
    return modalWrapper;
};

export default Modal;
