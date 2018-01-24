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
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
      completedTodos++
      }
    });
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
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
  deleteTodo: function(position) {
    theList.deleteTodo(position);
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
    
    theList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var textWithCompletion = '';
      
      if (todo.completed === true) {
        textWithCompletion = '(X) ' + todo.text;
      } else {
        textWithCompletion = '( ) ' + todo.text;
      todoLi.id = position;
      todoLi.textContent = textWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
      }
      // arr.forEach(callback[, thisArg])
      // Need to add this after the callback in order to refer to the view object and not the callback itself
    }, this);
    
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListeners: function() {
    var todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function(event) {
      // Get the element that was clicked on
      var elementClicked = event.target;

      // Check if element clicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setupEventListeners();