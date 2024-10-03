import type { ImageType } from '../Types';

function ImageList(images: ImageType[]) {
    const imageListElement = document.createElement('div');
    imageListElement.className = 'wrapper-image-list';

    const render = () => {
        images.forEach((image: ImageType) => {
            const imageWrapperElement = document.createElement('div');
            const imageElement = document.createElement('img');
            imageWrapperElement.className = 'image-wrapper';
            imageElement.src = image.url;
            imageElement.alt = '고양이 이미지';
            imageElement.width = 150;
            imageElement.height = 150;

            imageListElement.appendChild(imageWrapperElement);
            imageWrapperElement.appendChild(imageElement);
        });
    };
    render();

    return imageListElement;
}

export default ImageList;
