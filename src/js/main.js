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
        if (this.current !== 0) {
            this.data.pop();
            this.current -= 1;    
            return true;
        }
        return false;
    }
}

class TaskData {
    Data = {}
    loadData(){
        if (window.localStorage.getItem("Data") !== null) {
            this.Data = JSON.parse(window.localStorage.getItem("Data")) 
        }
    }
    saveData(){
        window.localStorage.setItem("Data", JSON.stringify(this.Data))
    }
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
    var p = Object.values(taskData.Data[taskData.path.path()])
    p.forEach(element => {
    taskCount++;    
    
    var e = document.createElement('div');
    
    e.innerHTML = TaskTemplate(taskCount, element.data[0]);
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
    console.log(taskNumber)
    console.log(taskData.Data[taskData.path.path()])
    if (taskData.Data[taskData.path.path()][taskNumber].data !== undefined) {
        taskData.Data[taskData.path.path()][taskNumber].data.forEach(element => {
        q++;
        var e = document.createElement('div');
        e.style = ("white-space: pre-wrap;")
        e.innerHTML = element;
        menuobj.appendChild(e);
        var a = document.createElement('button');
        a.type = "button";
        a.id = q;
        a.onclick = () => {

            var i = document.createElement('div');
            var textArea = document.createElement('textarea');
            var appendedTextArea = e.appendChild(textArea);
            const easymde = new EasyMDE({
                element: appendedTextArea
            }) 
            
            var x = document.createElement("button");
            x.type = "button";
            x.onclick = () => {
                var temp = easymde.value()
                var input = marked.parse(temp);
                SubmitEdit(this, taskNumber, a.id, input);
            }
            i.appendChild(x);
            i.innerHTML += `
            <button type="button" onclick="CancelEdit(this)">Cancel</button>
            <button type="button" onclick="newLine( `+ a.id + ","+ taskNumber +`)">new line</button>
            <button type="button" onclick="deleteLine(` + taskNumber + "," + a.id +`)" style="background-color: red" > delete this line</button>`
            i.class = "editMenu"
            
            
            
            e.appendChild(i);
        }
        a.innerHTML = "edit";
        menuobj.appendChild(a);
        
    }); 
    const br = document.createElement('br');
    menuobj.appendChild(br);
    var o = document.createElement("button")  
    o.type = "button"
    o.innerHTML = "subtasks"
    o.onclick = () => {
        var t = document.getElementById("path");
     t.innerHTML += "<div>" + taskData.Data[taskData.path.path()][taskNumber].data[0] + "/</div>"
     taskData.path.setPathDown(taskNumber);
     loadTasks();
     deleteMenu();
    }
    var v = document.createElement("button") 
    v.type = "button"
    v.innerHTML = "Delete"
    v.style = "background-color: red"
    v.onclick = () => {
        if(confirm("are you shere you want to delete this task and its subtasks? ")){
            deleteSubTasks(taskNumber + ".")
            delete taskData.Data[taskData.path.path()][taskNumber];
            loadTasks();
            deleteMenu();
        }
    }

     
    }
    menuobj.appendChild(o);
    menuobj.appendChild(v);
}


function SubmitEdit(button, taskNumber, i, input) {
    var div = button.parentNode;
    var parent = div.parentNode;
    div.remove(); 
    taskData.Data[taskData.path.path()][taskNumber].data[i] = input;
    parent.innerHTML = input;
    if (i === 0) {
        var tasks = document.getElementById("tasks");
        var task = tasks.children.item(taskNumber);
        task.innerHTML = TaskTemplate(taskNumber, input);
    }
}

function CancelEdit(button) {
    var div = button.parentNode;
    div.remove();
}
function up() {
    if (taskData.path.setPathUp()) {
        loadTasks();
        var t = document.getElementById("path");
        var g = t.children.item(t.children.length - 1)
        g.remove();
        deleteMenu();
    }
}
function deleteSubTasks(subPath){
    if (taskData.Data[taskData.path.path() + subPath] !== undefined) {
        var d = Object.keys(taskData.Data[taskData.path.path() + subPath]);
        d.forEach(element => {
            deleteSubTasks(subPath + element + ".");
        })
        delete taskData.Data[taskData.path.path() + subPath];
    }
}
function deleteMenu(){
    var menu = document.getElementById("menu");
    menu.innerHTML = "";
    
}
function newLine(id, taskNumber){
    taskData.Data[taskData.path.path()][taskNumber].data.splice(id + 1,0,"a new line")
    taskButtonClick(taskNumber);
}
function deleteLine(taskNumber, id) {
    taskData.Data[taskData.path.path()][taskNumber].data.splice(id,1)
    taskButtonClick(taskNumber);    
}
taskData.loadData();
loadTasks()
