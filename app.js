//Se obtiene el elemento por su id y realiza un evento al dar clic, y se realiza la funcion.
document.getElementById('formTask').addEventListener('submit', saveTask);

//funcion guardar Tarea
function saveTask(e){

    let title = document.getElementById('title').value;//Se declara variable y Guarda el valor del input title
    let description = document.getElementById('description').value;//Declara variable y guarda la descripcion
    
    //creamos un objeto
    const task = {
        title,
        description
    };
    
    //Para guardar nuestros datos que sean introducidos
    //localStorage.setItem('tasks', JSON.stringify(task));//El objeto se vuelve String
    //Para obtener los datos
    //console.log(JSON.parse(localStorage.getItem('tasks')));
    
    //Comprobar si ya hay items o no
    if(localStorage.getItem('tasks') === null){
        let tasks = []; //arreglo
        tasks.push(task);//llenar mediante push con la tarea nueva
        localStorage.setItem('tasks', JSON.stringify(tasks));//Nos permite convertir un objeto a una cadena JSON
    }
    //Si ya existen
    else{
        //obtener tareas y se convierten en JSON
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        //se actualizan mediante push
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));//Nos permite convertir un objeto a una cadena JSON
    }
    getTasks();//Al almacenar se obtienen las tareas
    document.getElementById('formTask').reset();//Limpiar el formulario
    e.preventDefault();//Evita que la página se recargue
}

//funcion para obtener tareas
function getTasks(){
    //obtener las tareas y hacerlas formato JSON
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    //obtener el id donde se insertaran
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';//Limpiar

    //Recorrer los datos
    for(let i=0; i< tasks.length; i++){
        let title = tasks[i].title;//variable para mostrar titulo
        let description = tasks[i].description;//variable para mostrar descripcion
        //insertar en el html
        tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
            <p>${title} - ${description}</p>
            <a class="btn btn-danger" onClick="deleteTask('${title}')">Eliminar</a>
        </div>
        </div>`
    }
}

//funcion para eliminar tareas
function deleteTask(title){
    //Obtener las tareas
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    //Recorrer el arreglo con las variables
    for(let i = 0; i < tasks.length; i++){
        //Si el titulo de la tarea coincide lo elimina
        if (tasks[i].title == title){
            //splice para quitar dato
            tasks.splice(i, 1);
        }
    }
    //Guardar nuevamente los datos y ejecutar la funcion Obtener tareas
    localStorage.setItem('tasks', JSON.stringify(tasks));//Nos permite convertir un objeto a una cadena JSON
    getTasks();
}
getTasks();