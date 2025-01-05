const $= document;
//--------------------------------------------------------intro
let form= $.querySelector('#task-form');
let inputTaskUser= $.querySelector('#task');
let LiFragment= $.createDocumentFragment();
let boxListTodo= $.querySelector('#ul');
let inputLabel= $.querySelector('#label');
let clearAllBtn= $.querySelector('.clear-tasks');
let filterTask= $.querySelector('#filter');




//--------------------------------------------------------addEvent
form.addEventListener('submit', addTaskInListTodo);
form.addEventListener('keydown', addTaskInListTodoWithEnter);
window.addEventListener('load', renderData);
clearAllBtn.addEventListener('click', clearAllTasks);
filterTask.addEventListener('keyup', showTaskSimilar);

//--------------------------------------------------------function
function addTaskInListTodo(e){
    e.preventDefault();

    if (inputTaskUser.value.trim()) {
        inputLabel.innerHTML=`وظیفه جدید`;
        inputLabel.style.color='#9e9e9e';
        let taskEnter= inputTaskUser.value.toLowerCase().trim();

        let taskArray=setTasksInLocalStorage(taskEnter);
        
        createBoxLiTask(taskArray);
        
        inputTaskUser.value='';
    }else{
        inputLabel.innerHTML=`   Please Enter Your New Task   `;
        inputLabel.style.color='orangered';
    }
}

function addTaskInListTodoWithEnter(e){
    if(e.keyCode === 13 ){
        addTaskInListTodo(e);
    }
    
}

function createBoxLiTask(array){
    boxListTodo.innerHTML='';
    array.forEach(task=>{ //array
        let liTask= $.createElement('li');
        liTask.classList.add('collection-item');

        let divTask= $.createElement('div');
        divTask.classList.add('contentLi');
        
        let titleTask= $.createElement('h6');
        titleTask.classList.add('titleTask');
        titleTask.innerHTML= task; //task

        let linkTask= $.createElement('a');
        linkTask.classList.add('secondary-content');
        linkTask.setAttribute('href','#');

        let iconTask= $.createElement('i');
        iconTask.classList.add('Tiny','material-icons');
        iconTask.innerHTML='delete';

        iconTask.addEventListener('click', removeLiTask);

        linkTask.append(iconTask);
        divTask.append(titleTask,linkTask);
        liTask.append(divTask);
        LiFragment.append(liTask);

    })
    boxListTodo.append(LiFragment);
}

function setTasksInLocalStorage(task){
    let tasks= JSON.parse(localStorage.getItem('tasksInLocal')) || [];

    if(tasks.indexOf(task) !== -1){
        inputLabel.innerHTML=`   Please Enter Your New Task   `;
        inputLabel.style.color='orangered';
    }else{
        tasks.push(task);

        localStorage.setItem('tasksInLocal', JSON.stringify(tasks));
    }
   

    return tasks;
}

function renderData(){
    let tasksGetLocalStorage= JSON.parse(localStorage.getItem('tasksInLocal'));

   if(tasksGetLocalStorage != null){
    createBoxLiTask(tasksGetLocalStorage);
   }
}

function removeLiTask(e){
    let arrayList;
    let tasksGetLocalStorage= JSON.parse(localStorage.getItem('tasksInLocal'));
    taskSelectRemove= e.target.parentElement.previousElementSibling.textContent;

    let arrayNewAfterRemove= tasksGetLocalStorage.filter(task=>{
        return task != taskSelectRemove;
    })
    localStorage.clear();
    
    arrayNewAfterRemove.forEach(task=>{
    arrayList=setTasksInLocalStorage(task);
    })
  
    if(tasksGetLocalStorage != null){
        createBoxLiTask(arrayList)
    }
    
  console.log(arrayNewAfterRemove);
}

function clearAllTasks(){
    boxListTodo.innerHTML='';
    localStorage.clear();
}

function showTaskSimilar(e){
    let keyTask= e.target.value.toLowerCase().trim();
    
    let tasksGetLocalStorage= JSON.parse(localStorage.getItem('tasksInLocal'));

    let arrayFilterTask= tasksGetLocalStorage.filter(task=>{
        return task.includes(keyTask);
    })

    createBoxLiTask(arrayFilterTask)
    
}
