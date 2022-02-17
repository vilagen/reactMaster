import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

//because our shop data is an object, but we use a map on collection-overview page to list out the items,
// we are collecting a list of keys, then usin map function to create a new array for collection-overview to use.
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) =>
  // createSelector([selectCollections], (collections) =>
  // collections.find(
  //   (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
  // )
  // after updating the array on shop.data.js to a full object:
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );
