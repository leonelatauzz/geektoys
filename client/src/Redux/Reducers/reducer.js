import localStorage from 'local-storage'
const initialState = {
    products: [],
    productId: null,
    categories: [],
    categoryProducts: [],
    categoryId: null,
    productCategories: [],
    search: [],
    cart: [],
    userId: null,
    activeOrder: null,
    loggedIn: false,
    dbCart: [],
    adresses: [],
    adressId: null,
    purchaseData: null,
    purchaseProducts: [],
    review: [],
    token: null,
    idP: null,
    favorites: [],
    rID: null
}
export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { ...state, products: action.payload }
        case 'GET_A_PRODUCT':
            return { ...state, productId: action.payload }
        case 'GET_CATEGORY_PRODUCTS':
            return { ...state, categoryProducts: action.payload }
        case 'GET_PRODUCT_CATEGORIES':
            return { ...state, productCategories: action.payload }
        case 'GET_CATEGORIES':
            return { ...state, categories: action.payload }
        case 'GET_CATEGORY_ID':
            return { ...state, categoryId: action.payload }
        case 'DELIVER_TO_CART':
            return { ...state, cart: state.cart.concat(action.payload) }
        case 'GET_USER_INFO':
            return { ...state, userId: action.payload }
        case 'GET_ACTIVE_ORDER':
            return { ...state, activeOrder: action.payload }
            case 'LOGIN':
                // localStorage.setItem('datos', JSON.stringify(user))
                // console.log(localStorage.getItem("datos"))
        return { ...state,
             loggedIn: true 
            
            }
        case 'LOGOUT':
            return { ...state, loggedIn: false }
        case 'GET_DB_CART':
            return { ...state, dbCart: action.payload }
        case 'RESET_CART':
            return { ...state, cart: [] }
        case 'GET_ADRESS':
            return { ...state, adresses: action.payload }
        case 'GET_A':
            return { ...state, adressId: action.payload }
        case 'GET_PURCHASE_DATA':
            return { ...state, purchaseData: action.payload }
        case 'GET_ORDER_PRODUCTS':
            return { ...state, purchaseProducts: action.payload }
        case 'GET_REVIEW_PRODUCTS':
            return { ...state, review: action.payload }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id != action.payload) }
        case 'GET_TOKEN':
            return { ...state, token: action.payload }
        case 'GET_PID':
            return { ...state, idP: action.payload }
        case 'GET_FAVORITES':
            return { ...state, favorites: action.payload }
        case 'GET_RID':
            return {...state, rID: action.payload}
        default:
            return state;
    }
}