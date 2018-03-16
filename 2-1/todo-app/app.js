var button = document.getElementById('buttonAdd');
var input = document.getElementById('inputAdd');
var list = document.getElementById('list');

/**
 * Remove to-do
 *
 * @param index
 */
function removeTodoFromStorage(index) {
    var todos = getTodosFromStorage();

    todos.splice(index, 1);

    saveTodosToStorage(todos);
}

/**
 * Add to-do
 *
 * @param text
 */
function addTodoToLocalStorage(text) {
    var todos = getTodosFromStorage();

    todos.push({
        text: text,
        completed: false
    });

    saveTodosToStorage(todos);
}

/**
 * Complete/incomplete to-do
 * @param index
 */

///////
//////
//////


/**
 * Handle remove to-do
 *
 * @param target
 */
function handleRemoveTodo(target) {
    var todo = target.parentElement;

    var id = todo.id;

    removeTodoFromStorage(id);
    render();
}

/**
 * Handle on click to-do
 *
 * @param event
 */
function onClickTodo(event) {
    var target = event.target;

    var tag = target.tagName;

    if (tag === 'LI') {
        //Complete/Incomplete to-do
    }

    if (tag === 'SPAN') {
        handleRemoveTodo(target);
    }
}

function renderTodoToHTML(text, completed) {
    var todo = document.createElement('li');
    todo.innerHTML = text + '<span class="close">×</span>';

    if (completed) {
        todo.className = "completed";
    }
    todo.addEventListener('click', onClickTodo);

    list.appendChild(todo);
}

function getTodosFromStorage() {
    var str = localStorage.getItem('todos');

    //Check empty string.
    if (!str) {
        return [];
    }

    try {
        return JSON.parse(str);
    } catch (error) {
        return [];
    }
}

function saveTodosToStorage(todos) {
    var str = JSON.stringify(todos);
    return localStorage.setItem('todos', str);
}

function clearList() {
    list.innerHTML = '';
}

function renderTodosList() {
    var todos = getTodosFromStorage();

    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];

        renderTodoToHTML(todo.text, todo.completed);
    }
}

function render() {
    clearList();
    renderTodosList();
}

function emptyInput() {
    input.value = '';
}

button.addEventListener('click', function () {
    var text = input.value;
    addTodoToLocalStorage(text);
    render();
    emptyInput();
});

/**
 * Initial
 */
render();