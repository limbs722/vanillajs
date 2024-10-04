import { Header, ImageList, Search, Modal, Pagenation } from './components';
import { apiGetImages } from './api';
import './styles/App.scss';
import type { ImageType } from './Types';

let items: ImageType[] = [];
let isLoading = false;
let currentPage = 1;

// 각 영역을 동적으로 생성하는 함수
function createSection(id: string): HTMLElement {
    const section = document.createElement('div');
    section.className = id;
    return section;
}

function showSpinner() {
    const appElement = document.getElementById('app')!;
    const spinnerWrapper = document.createElement('div');
    spinnerWrapper.className = 'wrapper-spinner';

    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    spinnerWrapper.appendChild(spinner);
    appElement.appendChild(spinnerWrapper);
}

function hideSpinner() {
    const appElement = document.getElementById('app')!;
    const spinnerWrapper = appElement.querySelector('.wrapper-spinner');
    if (spinnerWrapper) {
        appElement.removeChild(spinnerWrapper);
    }
}

// 레이아웃을 정의하는 함수
function renderLayout(images: ImageType[]) {
    const appElement = document.getElementById('app')!;

    // 기존 내용을 초기화
    appElement.innerHTML = '';

    // 레이아웃 구조를 명확하게 정의
    const mainElement = createSection('wrapper-main'); // Main 영역
    const headerElement = Header();
    const contentElement = createSection('wrapper-content'); // Content 영역
    const searchElement = Search({ onSearch });
    const modalElement = Modal();
    const imageListElement = ImageList(images);
    const pagenationElement = Pagenation(currentPage);

    // 각 섹션을 적절한 순서로 DOM에 추가
    appElement.appendChild(mainElement);
    appElement.appendChild(modalElement);
    mainElement.appendChild(headerElement);
    mainElement.appendChild(contentElement);
    contentElement.appendChild(searchElement);
    contentElement.appendChild(imageListElement);
    contentElement.appendChild(pagenationElement);

    const imageElements = document.querySelectorAll('.wrapper-image');
    imageElements.forEach((img) => {
        img.addEventListener('click', (e) => {
            const target = e.target as HTMLImageElement;
            const image = images.find((image) => image.id === target.id);
            if (image) {
                modalElement.style.display = 'block';
                modalElement.querySelector('.modal-title')!.textContent =
                    target.id;
                modalElement
                    .querySelector('.content-image')!
                    .setAttribute('src', image.url);
                modalElement
                    .querySelector('.content-image')!
                    .setAttribute('width', '500px');
                modalElement
                    .querySelector('.content-image')!
                    .setAttribute('height', '500px');
            }
        });
    });

    const prevButton = document.querySelector('.button-prev');
    const nextButton = document.querySelector('.button-next');

    prevButton?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            loadMoreImages();
        }
    });
    nextButton?.addEventListener('click', () => {
        currentPage += 1;
        loadMoreImages();
    });
}

function onSearch() {
    isLoading = true;
    currentPage = 1;
    showSpinner();
    const search = (document.getElementById('#searchInput') as HTMLInputElement)
        .value;
    apiGetImages({ query: search, page: currentPage })
        .then((response) => {
            setInterval(() => {}, 3000);
            setState(response);
        })
        .finally(() => {
            isLoading = false;
            hideSpinner();
        });
}

async function loadMoreImages() {
    isLoading = true; // 로딩 시작
    showSpinner();

    await apiGetImages({ query: '', page: currentPage })
        .then((res) => {
            setInterval(() => {}, 3000);
            setState(res);
        })
        .finally(() => {
            isLoading = false;
            hideSpinner();
        });
}

function setState(newState: ImageType[]) {
    items = newState;
    renderLayout(items); //재렌더링
}

async function initApp() {
    isLoading = true;
    showSpinner();
    await apiGetImages({ query: '', page: currentPage })
        .then((res) => {
            setInterval(() => {}, 3000);
            renderLayout(res);
        })
        .finally(() => {
            isLoading = false;
            hideSpinner();
        });
}

function App() {
    initApp();
}

export default App;
