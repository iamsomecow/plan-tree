function TaskTemplate(name = "new task") {
return '<button type="button" onclick="taskButtonClick('+ taskCount.toString() +')">' + name +'</button>'

}
let taskData = {}
let taskCount = 0
function newTask() {
    var taskobj = document.getElementById("tasks")
    taskobj.appendChild(TaskTemplate())
    taskData[taskCount.toString()].name = newTask;
}
function taskButtonClick(taskNumber) {
    var menuobj = document.getElementById("menu")
    
}
