import { Image } from './';
import type { ImageType } from '../Types';

function ImageList(images: ImageType[]) {
    const imageListElement = document.createElement('div');
    imageListElement.className = 'wrapper-image-list';

    const render = () => {
        images.forEach((image: ImageType) => {
            const imageElement = Image(image);
            imageListElement.appendChild(imageElement);
        });
    };
    render();

    return imageListElement;
}

export default ImageList;
