import { cardReducer } from '../reducer/cardReducer'

const { createContext, useContext, useReducer } = require('react')

const initialState = {
  cartList: [],
  total: 0,
}

const cartContext = createContext(initialState)

// Create Provider
export const CartProvider = ({ children }) => {
  // useReducer
  const [state, dispatch] = useReducer(cardReducer, initialState)

  // ADD TO CART
  const addToCart = product => {
    const updatedCartList = state.cartList.concat(product)
    updateTotal(updatedCartList)

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        products: updatedCartList,
      },
    })
  }

  // REMOVE FROM CART
  const removeFromCart = product => {
    const updatedCartList = state.cartList.filter(
      current => current.id !== product.id
    )
    updateTotal(updatedCartList)

    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        products: updatedCartList,
      },
    })
  }

  const updateTotal = products => {
    let total = 0
    products.forEach(product => (total = total + product.price))

    dispatch({
      type: 'UPDATE_TOTAL',
      payload: {
        total,
      },
    })
  }

  // Updated state
  const value = {
    total: state.total,
    cartList: state.cartList,
    addToCart,
    removeFromCart,
  }

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>
}

export const useCart = () => {
  const context = useContext(cartContext)
  return context
}
