import { Header, ImageList } from './components';
import './styles/App.scss';
// 각 영역을 동적으로 생성하는 함수
function createSection(id: string): HTMLElement {
    const section = document.createElement('div');
    section.className = id;
    return section;
}

// 레이아웃을 정의하는 함수
function renderLayout() {
    const appElement = document.getElementById('#app')!;

    // 기존 내용을 초기화
    appElement.innerHTML = '';

    // 레이아웃 구조를 명확하게 정의
    const mainElement = createSection('wrapper-main'); // Main 영역
    const headerElement = Header();
    const contentElement = createSection('wrapper-content'); // Content 영역
    const imageListElement = ImageList();

    // 각 섹션을 적절한 순서로 DOM에 추가
    appElement.appendChild(mainElement);
    mainElement.appendChild(headerElement);
    mainElement.appendChild(contentElement);
    contentElement.appendChild(imageListElement);
}

function App() {
    renderLayout();
}

export default App;
