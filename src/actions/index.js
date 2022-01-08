// import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchTasks = () => async dispatch => {
	// We can call backend API as below
	// const response = await jsonPlaceholder.get('/tasks');
	// dispatch({type: "FETCH_TASKS", payload: response.data});

	//Currently we are using static data.

  	dispatch({type: 'FETCH_TASKS'});
}

export const addTask = (taskName) => dispatch => {
	dispatch({type: "ADD_TASK", taskName});
}

export const changeStatus = (id) => dispatch => {
	dispatch({type: "CHANGE_STATUS", id});
}

export const deleteTask = (id) => dispatch => {
	dispatch({type: "DELETE_TASK", id});
}

export const updateTask = (id, taskName) => dispatch => {
	dispatch({type: "UPDATE_TASK", id, taskName});
}