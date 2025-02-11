function TaskTemplate(name = "new task") {
return '<button type="button" onclick="taskButtonClick('+ taskCount.toString() +')">' + name +'</button>'

}
let taskData = {}
let taskCount = 0
function newTask() {
    var taskobj = document.getElementById("tasks")
    taskobj.appendChild(document.createElement(TaskTemplate()))
    taskData[taskCount.toString()].name = "new task";
    taskData[taskCount.toString()].info = "this is a new task"
    taskData[taskCount.toString()].status = "working on it"
}
function taskButtonClick(taskNumber) {
    var menuobj = document.getElementById("menu")
    var Keys = taskData[taskNumber.toString()]
    Keys.forEach(element => {
        menuobj.appendChild(document.createElement('<p>' + taskData[taskNumber.toString()][element] + '</p>'))
    });
    
}
