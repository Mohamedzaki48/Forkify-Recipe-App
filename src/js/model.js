import { api_Url, RES_PER_PAGE } from './config';
import { getJson } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],

    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookMarks: [],
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${api_Url}/${id}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingerdients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
    };
    if (state.bookMarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${api_Url}?search=/${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: `#${rec.id}`,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchResultsPages = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
export const updateServings = function (newServings) {
  state.recipe.ingerdients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
export const addBookMark = function (recipe) {
  state.bookMarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookMark = function (id) {
  const index = state.bookMarks.findIndex(el => {
    el.id === id;
  });
  state.bookMarks.slice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
