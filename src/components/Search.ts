const Search = ({ onSearch }: { onSearch: () => void }) => {
    const searchWrapper = document.createElement('div');
    const searchInput = document.createElement('input');
    const searchButton = document.createElement('button');

    searchWrapper.className = 'wrapper-search';
    searchInput.className = 'input-search';
    searchInput.id = '#searchInput';
    searchButton.className = 'button-search';
    searchButton.id = '#searchButton';

    searchInput.placeholder = '고양이를 검색해보세요';
    searchButton.textContent = '검색';

    searchButton.addEventListener('click', onSearch);

    searchWrapper.appendChild(searchInput);
    searchWrapper.appendChild(searchButton);

    return searchWrapper;
};

export default Search;
