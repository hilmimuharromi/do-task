


const initialState = {
    data: [],
}

export default function ProjectReducer(state = initialState, action) {

    if (action.type === 'ADD_TASK') {
        let newTask = action.payload
        
        console.log('new Task ===>', newTask)
        return {
            ...state,
            data: [...state.data, newTask]
        };
    } 

    return state

}