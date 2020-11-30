import CartActionTypes from './cart.types';

// we don't need a payload, because the reducer is set to change 
// the state from true to false automatically
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});