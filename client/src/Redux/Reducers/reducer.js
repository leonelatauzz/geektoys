const initialState = {
    name: ''
}
export default function(state = initialState, action){
    switch(action.type){
        case 'NAME': return {...state, name: action.name}  //PREGUNTAR AL TL

        default: 
        return state;
    }
}