import View from './views';
import icons from 'url:../../img/icons.svg';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    // this._clear();
    return this._parentElement.querySelector('.search__field').value;
    this._clear();
  }
  _clear() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  addSearchHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('sdads');
      handler();
    });
  }
}

export default new SearchView();
