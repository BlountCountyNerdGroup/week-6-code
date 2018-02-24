// this JS file will control any visual animations


$(document).ready(function() {
    var todoInputExpanded = false;

    $('#addTodoWrapper').on("mouseenter", function() {
        if (!todoInputExpanded) {
            $('#newTodo').animate({width:'toggle'}, 500);
            todoInputExpanded = true;
        }
    });

    // not working for some reason
    $('#addTodoButton').on("click", function() {
        todoInputExpanded = false;
        $('#newTodo').animate({width:'toggle'}, 500);
        $('#newTodo').val("")
    });
});