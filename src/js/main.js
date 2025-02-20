class Path {
    data = ['0']
    current = 0 

    path() {
        let concat = "";
        this.data.forEach((element) => {
            concat += element + ".";
        });
        return concat;
    }

    setPathDown(number) {
        this.current++;
        this.data[this.current] = number;
    }

    setPathUp() {
        this.current -= 1;
    }
}

class TaskData {
    Data = {}
    path = new Path()
    
    Task(number, data) {
        if (!this.Data[this.path.path()]) {
            this.Data[this.path.path()] = {};
        }
        this.Data[this.path.path()][number] = { data: data };
    }
}

var taskData = new TaskData();
var taskCount = 0;
function loadTasks() {
    var taskobj = document.getElementById("tasks");
    taskobj.innerHTML = '<button type="button" class="newtasks" onclick="newTask()">new task</button>';
    taskCount = 0;
    if (taskData.Data[taskData.path.path()] !== undefined) {
        console.log(taskData.Data[taskData.path.path()]);
    var p = taskData.Data[taskData.path.path()].values();
    p.forEach(element => {
        
    
    var e = document.createElement('div');
    
    e.innerHTML = TaskTemplate(taskCount, element[0]);
    taskobj.appendChild(e)

    });
}
}
function TaskTemplate(number, name = "new task") {
    return '<button type="button" class="tasks" onclick="taskButtonClick('+ number +')">' + name +'</button>';
}

function newTask() {
    taskCount++;
    var taskobj = document.getElementById("tasks");
    var e = document.createElement('div');
    e.innerHTML = TaskTemplate(taskCount);
    e.id = taskCount;
    taskobj.appendChild(e);
    taskData.Task(taskCount, ["new task", "this is a new task", "working on it"]);
}

function taskButtonClick(taskNumber) {
    var menuobj = document.getElementById("menu");
    menuobj.innerHTML = '';
    var q = -1;
    if (taskData.Data[taskData.path.path()][taskNumber].data !== undefined) {
        
    
    taskData.Data[taskData.path.path()][taskNumber].data.forEach(element => {
        q++;
        var e = document.createElement('div');
        e.innerHTML = element;
        menuobj.appendChild(e);
        var a = document.createElement('button');
        a.type = "button";
        a.id = q;
        a.onclick = () => {
            var i = document.createElement('div');
            i.innerHTML = `<label for="simpleInput">edit task:</label>
            <input type="text" id="input" name="simpleInput" placeholder="Enter text here">
            <button onclick="SubmitEdit(this,`+ taskNumber + "," + a.id + `)">Submit</button>
            <button onclick="CancelEdit(this)">Cancel</button>`;
            e.appendChild(i);
        }
        a.innerHTML = "edit";
        menuobj.appendChild(a);
        
    }); 
    var o = document.createElement("button")  
    o.type = "button"
    o.onclick = () => {
     taskData.path.setPathDown();
     loadTasks();
    }
    menuobj.appendChild(o);
}
}

function SubmitEdit(button, taskNumber, i) {
    var div = button.parentNode;
    var parent = div.parentNode;
    var input = div.querySelector('#input');
    div.remove(); 
    taskData.Data[taskData.path.path()][taskNumber].data[i] = input.value;
    parent.innerHTML = input.value;
    if (i === 0) {
        var tasks = document.getElementById("tasks");
        var task = tasks.children.item(taskNumber);
        task.innerHTML = TaskTemplate(taskNumber, input.value);
    }
}

function CancelEdit(button) {
    var div = button.parentNode;
    div.remove();
}
function up() {
    taskData.path.setPathUp();
    loadTasks();
}
