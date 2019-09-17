import axios from 'axios';

import { ADD_TASK, EDIT_TASK, GET_TASKS, GET_TASK, GET_ERRORS } from './types';

// Add TASK
export const addTask = (taskData, history) => async dispatch => {
  try {
    const res = await axios.post('/api/tasks', taskData);

    history.push('/dashboard/tasks');
    dispatch({
      type: ADD_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// CloseTask TASK
export const closeTask = (id, history) => async dispatch => {
  try {
    const res = await axios.patch(`/api/tasks/${id}`);
    history.push('/dashboard/tasks');
    dispatch({
      type: EDIT_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Get TASK
export const getTask = id => async dispatch => {
  try {
    const res = await axios.get(`/api/tasks/task/${id}`);
    dispatch({
      type: GET_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Get TASKS
export const getTasks = () => async dispatch => {
  try {
    const res = await axios.get('/api/tasks');
    dispatch({
      type: GET_TASKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Get TASKS
export const getTasksSingleUser = id => async dispatch => {
  try {
    const res = await axios.get(`/api/tasks/${id}`);
    dispatch({
      type: GET_TASKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: 'tasks not found'
    });
  }
};
