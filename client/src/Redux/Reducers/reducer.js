const initialState = {
    products: [],
    productId: null,
    categories: [],
    categoryProducts: [],
    categoryId: null,
    productCategories: [],
    search: []
}
export default function(state = initialState, action){
    switch(action.type){
        case 'GET_PRODUCTS':
            return {...state, products: action.payload}
        case 'GET_A_PRODUCT':
            return {...state, productId: action.payload}
        case 'GET_CATEGORY_PRODUCTS':
            return {...state, categoryProducts: action.payload}
        case 'GET_PRODUCT_CATEGORIES':
            return {...state, productCategories: action.payload} 
        case 'GET_CATEGORIES':
            return {...state, categories: action.payload}  
        case 'GET_CATEGORY_ID':
            return {...state, categoryId: action.payload}  
        default: 
        return state;
    }
}