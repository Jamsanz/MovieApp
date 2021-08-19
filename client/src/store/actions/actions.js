const ADD_USER='ADD_USER'
const DELETE_USER='DELETE_USER'
export const addUser=(user)=>{
    return{
        type:ADD_USER,
        payload: user
    }
}

export const deleteUser=()=>{
    return{
        type:DELETE_USER,
    }
}