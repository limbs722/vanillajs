import axios from 'axios';

// [{"id":"bo2","url":"https://cdn2.thecatapi.com/images/bo2.jpg","width":533,"height":800}]
type ImageType = {
    id: string;
    url: string;
    width: number;
    height: number;
};

function ImageList() {
    const getImages = async () => {
        const response = await axios.get(
            'https://api.thecatapi.com/v1/images/search?limit=10',
        );

        return response.data || [];
    };

    const imageListElement = document.createElement('div');
    imageListElement.className = 'wrapper-image-list';

    const render = async () => {
        const images = await getImages();

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
