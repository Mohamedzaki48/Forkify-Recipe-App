import View from './views';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No Recepies found Try again';
  _generateMarkUp() {
    return this._data.map(this._generateMarkUpPreview).join('');
  }

  _generateMarkUpPreview(results) {
    return `<li class="preview">
<a class="preview__link preview__link--active" href="${results.id}">
<figure class="preview__fig">
  <img src="${results.image}" alt="Test" />
</figure>
<div class="preview__data">
  <h4 class="preview__title">${results.title} ...</h4>
  <p class="preview__publisher">${results.publisher}</p>
  <div class="preview__user-generated">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
</div>
</a>
</li>`;
  }
}
export default new ResultsView();
