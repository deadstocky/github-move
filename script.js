// ---------- CREATES TO-DO LIST AND FUNCTIONS ----------
var theList = {
  todos: [],
  addTodo: function(text) {
    this.todos.push({
      text: text,
      completed: false
    });
  },
  editTodo: function(position, newText) {
    this.todos[position].text = newText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++
      }
    }
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
  }
};

// ---------- HANDLES PASSING ALL FUNCTIONS ----------
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    theList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  editTodo: function() {
    var editTodoPositionInput = document.getElementById('editTodoPositionInput');
    var editTodoTextInput = document.getElementById('editTodoTextInput');
    theList.editTodo(editTodoPositionInput.valueAsNumber, editTodoTextInput.value);
    editTodoPositionInput.value = '';
    editTodoTextInput.value  = '';
    view.displayTodos();
  },
  deleteTodo: function() {
    var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    theList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = '';
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    theList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    theList.toggleAll();
    view.displayTodos();
  }
};

// ---------- HANDLES DISPLAYING ALL UI ----------
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < theList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var textWithCompletion = '';
      var todo = theList.todos[i];
      if (todo.completed === true) {
        textWithCompletion = '(X) ' + todo.text;
      } else {
        textWithCompletion = '( ) ' + todo.text;
      }
      todoLi.textContent = textWithCompletion;
      todosUl.appendChild(todoLi);
    }
  }
};