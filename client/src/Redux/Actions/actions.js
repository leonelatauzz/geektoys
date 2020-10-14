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

