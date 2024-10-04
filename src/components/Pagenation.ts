const Pagenation = (currentPage: number) => {
    const pageWrapper = document.createElement('div');
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    const currPage = document.createElement('span');

    pageWrapper.className = 'wrapper-pagenation';
    prevButton.className = 'button-prev';
    nextButton.className = 'button-next';
    currPage.className = 'current-page';

    prevButton.textContent = 'Prev';
    nextButton.textContent = 'Next';

    currPage.textContent = `${currentPage}`;

    pageWrapper.appendChild(prevButton);
    pageWrapper.appendChild(currPage);
    pageWrapper.appendChild(nextButton);

    return pageWrapper;
};

export default Pagenation;
