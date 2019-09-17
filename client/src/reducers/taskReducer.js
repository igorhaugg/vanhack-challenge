import { ADD_TASK, EDIT_TASK, GET_TASK, GET_TASKS } from '../actions/types';

const initialState = {
  task: {},
  tasks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        task: {}
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: [...state.tasks],
        task: {}
      };
    case GET_TASK:
      return {
        ...state,
        task: action.payload
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    default:
      return state;
  }
}
