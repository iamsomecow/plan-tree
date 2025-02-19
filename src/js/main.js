let taskData = {};
let taskCount = 0;
function TaskTemplate(name = "new task") {
return '<button type="button" class="tasks" onclick="taskButtonClick('+ taskCount.toString() +')">' + name +'</button>';

}
function newTask() {
    taskCount++;
    var taskobj = document.getElementById("tasks");
    var e = document.createElement('div');
    e.innerHTML = TaskTemplate();
    taskobj.appendChild(e);
    taskData[taskCount] = ["new task","this is a new task","working on it"];
    console.log(taskData);
}
function taskButtonClick(taskNumber) {
    var menuobj = document.getElementById("menu");
    menuobj.innerHTML = "";
    var i = -1;
    taskData[taskNumber].forEach(element => {
        i++;
        var e = document.createElement('div');
        e.innerHTML = element;
        menuobj.appendChild(e);
        var a = document.createElement('button');
        a.type = "button";
        
        a.onclick = () => {
            
            var i = document.createElement('div')
            
            i.innerHTML = `<label for="simpleInput">edit task:</label>
            <input type="text" id="input" name="simpleInput" placeholder="Enter text here">
            <button onclick="SubmitEdit(this,`+ taskNumber + i +`)">Submit</button>
            <button onclick="CancelEdit(this)">Cancel</button>`
            e.appendChild(i);
        }
        a.innerHTML = "edit";
        menuobj.appendChild(a);
        
    });   
}
function SubmitEdit(button,taskNumber,i) {
    var div = button.parentNode;
    var parent = div.parentNode;
    var input = div.querySelector('#input');
    div.remove(); 
    taskData[taskNumber][i] = input.value;
    parent.innerHTML = input.value;
    
}
function CancelEdit(button) {
    var div = button.parentNode;
    div.remove();
}

