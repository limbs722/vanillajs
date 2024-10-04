import type { ImageType } from '../Types';

function Image(image: ImageType) {
    const imageWrapperElement = document.createElement('div');
    imageWrapperElement.className = 'wrapper-image';
    const imageElement = document.createElement('img');
    imageElement.src = image.url;
    imageElement.id = image.id;
    imageElement.alt = image.id;
    imageElement.width = 150;
    imageElement.height = 150;

    imageWrapperElement.appendChild(imageElement);

    return imageWrapperElement;
}

export default Image;
