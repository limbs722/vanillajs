import { Header, ImageList, Search } from './components';
import { apiGetImages } from './api';
import './styles/App.scss';
import type { ImageType } from './Types';
// 각 영역을 동적으로 생성하는 함수
function createSection(id: string): HTMLElement {
    const section = document.createElement('div');
    section.className = id;
    return section;
}

// 레이아웃을 정의하는 함수
function renderLayout(images: ImageType[]) {
    const appElement = document.getElementById('#app')!;

    // 기존 내용을 초기화
    appElement.innerHTML = '';

    // 레이아웃 구조를 명확하게 정의
    const mainElement = createSection('wrapper-main'); // Main 영역
    const headerElement = Header();
    const contentElement = createSection('wrapper-content'); // Content 영역
    const searchElement = Search({ onSearch });
    const imageListElement = ImageList(images);

    // 각 섹션을 적절한 순서로 DOM에 추가
    appElement.appendChild(mainElement);
    mainElement.appendChild(headerElement);
    mainElement.appendChild(contentElement);
    contentElement.appendChild(searchElement);
    contentElement.appendChild(imageListElement);
}

function onSearch() {
    const search = (document.getElementById('#searchInput') as HTMLInputElement)
        .value;
    apiGetImages({ query: search }).then((response) => {
        setState(response);
    });
}

let items: ImageType[] = [];

function setState(newState: ImageType[]) {
    items = newState;
    renderLayout(items); //재렌더링
}

async function initApp() {
    // items = await resource.container.fetch();
    items = await apiGetImages({ query: '' });
    renderLayout(items);
}

function App() {
    initApp();
}

export default App;
