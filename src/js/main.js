function TaskTemplate(name = "new task") {
return '<button type="button" onclick="taskButtonClick('+ taskCount.toString() +')">' + name +'</button>'

}
let taskData = {}
let taskCount = 0
function newTask() {
    taskCount++
    var taskobj = document.getElementById("tasks")
    taskobj.appendChild(document.createElement('div').innerHTML(TaskTemplate()))
    taskData[taskCount] = ["new task","this is a new task","working on it"]
    console.log(taskData)
}
function taskButtonClick(taskNumber) {
    var menuobj = document.getElementById("menu")
    menuobj.innerHTML = ""
    taskData[taskNumber].forEach(element => {
        menuobj.appendChild(document.createElement('div').innerHTML(element))
    });   
}
