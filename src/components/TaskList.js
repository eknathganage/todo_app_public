import React from 'react';
export default class TaskList extends React.Component {
  
  deleteTask(id) {
    this.props.deleteTask(id);
  }

  changeStatus(id) {
    this.props.changeStatus(id);
  }

  onTaskUpdate(id, name) {
    this.props.onTaskUpdate(id, name);
  }

  renderList() {
      return this.props?.tasks?.map(task => {
        return(
          <li 
          className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2" key={task.id}>
          <div className="d-flex align-items-center">
          {task.completed ? <s>{task.name || "-"}</s> : (task.name || "-")}
          </div>
          <div className="d-flex align-items-center">
          {!task.completed && <div style={{width: "50px"}}>
              <a href="#!" data-mdb-toggle="tooltip" title="Mark as Complete" onClick={()=>this.changeStatus(task.id)}>
              <i className="fa fa-check text-success"></i>
              </a>
          </div>}
          {!task.completed && <div style={{width: "50px"}}>
              <a href="#!" data-mdb-toggle="tooltip" title="Edit Task" onClick={()=>this.onTaskUpdate(task.id, task.name)}>
              <i className="fas fa-edit text-secondary"></i>
              </a>
          </div>}
          <div>
              <a href="#!" data-mdb-toggle="tooltip" title="Delete Task" onClick={()=>this.deleteTask(task.id)}>
              <i className="fas fa-trash text-danger"></i>
              </a>
          </div>
          </div>
      </li>
      )
    })
  }

  render() {
      return <ul className="list-group mb-0 list-layout">
        {this.renderList()}
    </ul>;
  }
}