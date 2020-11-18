import React from 'react'


export const getProducts = function(props){
    return {
        type: 'GET_PRODUCTS',
        payload: props
    }
}

export const getAProduct = function(props){
    return {
        type: 'GET_A_PRODUCT',
        payload: props
    }
}

export const getCategoryProduct = function(props){
    return {
        type: 'GET_CATEGORY_PRODUCTS',
        payload: props
    }
}

export const getProductCategory = function(props){
    return {
        type: 'GET_PRODUCT_CATEGORIES',
        payload: props
    }
}
export const getCategories = function(props){
    return {
        type: 'GET_CATEGORIES',
        payload: props
    }
}
export const getCategoryId = function(props){
    return {
        type: 'GET_CATEGORY_ID',
        payload: props
    }
}
 export const deliverToCart= function(props){
     return {
         type: 'DELIVER_TO_CART',
         payload: props
     }
 }
 export const getUserInfo = function(props){
     return{
         type: 'GET_USER_INFO',
         payload: props
     }
 }
 export const getActiveOrder = function(props){
    return{
        type: 'GET_ACTIVE_ORDER',
        payload: props
    }
}
export const logIn = function(){
    return{
        type: 'LOGIN'
        
    }
}
export const logOut = function(){
    return{
        type: 'LOGOUT'
        
    }
}
export const getDbCart = function(props){
    return{
        type: 'GET_DB_CART',
        payload: props
    }
}
export const resetCart = function(){
    return{
        type: 'RESET_CART',
    }
}
export const getAdress = function(props){
    return{
        type: 'GET_ADRESS',
        payload: props
    }
}
export const getA = function(props){
    return{
        type: 'GET_A',
        payload: props
    }
}
export const getPurchaseData = function(props){
    return{
        type: 'GET_PURCHASE_DATA',
        payload: props
    }
}
export const getOrderProducts = function(props){
    return{
        type: 'GET_ORDER_PRODUCTS',
        payload: props
    }
}
export const getReviewProducts = function(props){
    return{
        type: 'GET_REVIEW_PRODUCTS',
        payload: props
    }
}

export const removeFromCart = function(props){
    return{
        type: 'REMOVE_FROM_CART',
        payload: props
    }
}
export const getToken = function(props){
    return{
        type: 'GET_TOKEN',
        payload: props
    }
}
export const getPID = function(props){
    return{
        type: 'GET_PID',
        payload: props
    }
}
export const getFavorites = function(props){
    return{
        type: 'GET_FAVORITES',
        payload: props
    }
}
export const getReviewId = function(props){
    return{
        type: 'GET_RID',
        payload: props
    }
}










