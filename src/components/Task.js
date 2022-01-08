import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks, addTask, changeStatus, deleteTask, updateTask } from '../actions';
import "./css/task.css";
import TaskList from "./TaskList";
import AlertMessage from "./AlertMessage";

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.taskInputRef = React.createRef();
  }

  state = {
    isUpdate: false,
    updateId: "",
    showAlert: false,
    showErrorAlert: false
  }
  
  componentDidMount() {
    this.props.fetchTasks();
  }

  updateAlertMessage = () => {
    this.setState((prevState)=>({showAlert: !prevState.showAlert}))
  }

  updateErrorAlertMessage = () => {
    this.setState((prevState)=>({showErrorAlert: !prevState.showErrorAlert}))
  }

  resetData = () => {
    this.setState({
      isUpdate: false,
      updateId: ""
    });
    this.taskInputRef.current.value = "";
  }

  addNewTask = () => {
    const {isUpdate, updateId} = this.state;
    const name = this.taskInputRef?.current?.value || "";
    if (name) {
      if (isUpdate && updateId) {
        this.props.updateTask(updateId, name);
      } else {
        this.props.addTask(name);
      }
      this.resetData();
      this.updateAlertMessage();
      
    } else {
      this.updateErrorAlertMessage();
    }
  }

  deleteTask = (id) => {
    this.props.deleteTask(id);
    this.updateAlertMessage();
  }

  changeStatus = (id) => {
    this.props.changeStatus(id);
    this.updateAlertMessage();
  }

  onTaskUpdate = (id, name) => {
    this.setState({
      isUpdate: true,
      updateId: id
    });
    this.taskInputRef.current.value = name;
  }

  render() {
    const {showAlert, isUpdate, showErrorAlert} = this.state;
    return <section className="vh-100 app-bg-color">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
      
          <div className="card cart-border-radius">
          <div className="card-body p-5">
            {showErrorAlert && <AlertMessage alertClass="alert-danger" message="Please enter task name!" updateAlertMessage={this.updateErrorAlertMessage} />}
            {showAlert && <AlertMessage alertClass="alert-success" message="Operation successfully completed!" updateAlertMessage={this.updateAlertMessage} />}
            <h6 className="mb-3">Todo List</h6>
            <div className="d-flex justify-content-center align-items-center mb-4">
            <div className="form-outline flex-fill">
              <input 
                type="text"
                className="form-control form-control-lg"
                placeholder="What do you need to do today?"
                ref={this.taskInputRef}
              />
            </div>
              <button type="button" className="btn btn-primary btn-lg ms-2" onClick={this.addNewTask}>{isUpdate ? "Update" : "Add"}</button>
              {isUpdate && <button type="button" className="btn btn-secondary btn-lg ms-2" onClick={this.resetData}>Reset</button>}
            </div>
            <TaskList
              tasks={this.props.tasks}
              deleteTask={this.deleteTask}
              changeStatus={this.changeStatus}
              onTaskUpdate={this.onTaskUpdate}
            />
          </div>
          </div>
        </div>
        </div>
      </div>
    </section>;
  }
}

const mapStateToProb = (state) => {
	return {tasks: state.tasks};
};

export default connect(
  mapStateToProb,
  { fetchTasks, addTask, changeStatus, deleteTask, updateTask }
)(Task);
