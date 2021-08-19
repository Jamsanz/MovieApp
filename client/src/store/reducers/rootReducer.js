
const initialState={
    user:null,
}
const ADD_USER='ADD_USER';
const DELETE_USER='DELETE_USER';

export const rootReducer=(state=initialState, action)=>{
    switch (action.type) {
        case ADD_USER:
            return{...state, user:action.payload}
            break;
        case DELETE_USER:
            return {...state, user:null}
            break;
        default:
            break;
    }
};






