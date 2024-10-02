function Header() {
    // Header 요소 생성
    const headerElement = document.createElement('header');

    // 헤더 내용 추가
    const h1Element = document.createElement('h1');
    h1Element.textContent = '고양이 리스트';

    // 요소를 조합
    headerElement.appendChild(h1Element);

    return headerElement;
}

export default Header;
