import TodoList from './todo.js';

const myTodoList = new TodoList();

myTodoList.addTask('Learn Node.js modules');
myTodoList.addTask('Practice ES6 syntax');
myTodoList.addTask('Build a project');

myTodoList.markComplete(1);

console.log('All Tasks:');
myTodoList.listTasks().forEach(task => {
  console.log(`[${task.completed}] ${task.id}. ${task.description}`);
});