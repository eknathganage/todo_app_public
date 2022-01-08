let initTask = [{
	id: 1641634301390,
	name: "To complete given coding assignment",
	completed: true
},{
	id: 1641634313944,
	name: "Review coding assignment",
	completed: false
}];

const getUniqueId = () => {
	return Date.now();
};

const updateObject = (arrData, id, operation, name) => {
	return arrData.map((data) => {
		if(data.id === id) {
			if (operation === "status")
				data.completed = true;
			else 
				data.name = name;
		}
		return data;
	});
}

const deleteTask = (arrData, id) => {
	return arrData.filter(data => data.id !== id);
}

const tasksReducer = (state = initTask, action) => {
	switch(action.type) {
		case "FETCH_TASKS":
			return [...state];
		case "ADD_TASK":
			return [...state, {id:getUniqueId(), name: action.taskName, completed: false}];
		case "CHANGE_STATUS":
			let currentState = [...state];
			return updateObject(currentState, action.id, "status", undefined);
		case "UPDATE_TASK":
			let updateState = [...state];
			return updateObject(updateState, action.id, "name", action.taskName);
		case "DELETE_TASK":
			let objState = [...state];
			return deleteTask(objState, action.id);
		default:
			return state;
	}
};

export default tasksReducer;