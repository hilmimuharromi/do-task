import { v4 as uuidv4 } from 'uuid';

const initialState = {
    data: [],
}

export default function ProjectReducer(state = initialState, action) {

    if (action.type === 'ADD_PROJECT') {
        let newProject = action.payload
        newProject.id = uuidv4()
        console.log('new Project ===>', newProject)
        return {
            ...state,
            data: [...state.data, newProject]
        };
    } 

    return state

}