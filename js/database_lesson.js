function addTodo() {

    // add to list of names
    var todoText = document.getElementById('newTodo').value;

    if (todoText != "") {

        // save it to the database
        firebase.database().ref('/').push(todoText); 
    }
}

function createTodoHTML(todo, id) {

    // create a li (stands for line) in our webpage to put the todo in
    var todoDiv = document.createElement('li');
    todoDiv.innerHTML = todo + " " + createDeleteButton(id); // don't include 2nd part if we're not going to use it

    // add our newly created li to the todos section on our webpage
    document.getElementById('todos').appendChild(todoDiv);
}

// this means that when firebase gets a new value, it will give us new data
firebase.database().ref('/').on('value', function(snapshot) {
    overWriteTodos(snapshot.val());
});

function overWriteTodos(todos) {
    console.log(todos); // console.log this out

    document.getElementById('todos').innerText = "";

    for (var id in todos) {
        console.log(id)
        createTodoHTML(todos[id], id);
    }
}

// we want to load all todos when we come to the website
function loadTodos() {

    // retrieve from database
    firebase.database().ref('/').once("value", function(snapshot) {
        overWriteTodos(snapshot.val());
    });

}

// this should run as soon as we load the page
loadTodos();

// functions for deleting a todo. We might not use these during the lesson

function createDeleteButton(id) {

    // this is really ugly code
    var deleteButton = "<a href='#' onclick='deleteTodo(\"" + id + "\")'>X</a>";

    return deleteButton;
}

function deleteTodo(id) {
    firebase.database().ref('/').child(id).remove();

    loadTodos();
}
