const initialState = {
    titulo: ''
}
export default function(state = initialState, action){
    switch(action.type){
        case 'TITLE': return {...state, titulo: action.title}  //PREGUNTAR AL TL

        default: 
        return state;
    }
}