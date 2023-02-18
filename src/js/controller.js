import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeview.js';
import recipeview from './views/recipeview.js';
import searchView from './views/searchView.js';
import { async } from 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
//console.log(icons);

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
if (module.hot) {
  module.hot.accept();
}
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(window.location.hash);

    //console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //Loading Recipe
    await model.loadRecipe(id);
    //Rendering Recipe
    recipeView.render(model.state.recipe);
    controlServings(4);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    // console.log(query);

    await model.loadSearchResults(query);
    //console.log(model.state.search.results);
    resultsView.render(model.searchResultsPages());
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
const controlPagination = function (goToPage) {
  resultsView.render(model.searchResultsPages(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
};
const controlAddBookMark = function () {
  console.log(model.state.recipe.bookmarked);

  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookMark(model.state.recipe);
  }
  model.addBookMark(model.state.recipe);
  console.log(model.state.recipe);
  recipeView.render(model.state.recipe);
};
const init = function () {
  recipeview.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookMark);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
//controlSearchResults();
