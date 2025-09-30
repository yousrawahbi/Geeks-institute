class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({
      id: this.tasks.length + 1,
      description: task,
      completed: false,
      createdAt: new Date()
    });
  }

  markComplete(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
      return true;
    }
    return false;
  }

  listTasks() {
    return this.tasks.map(task => ({
      id: task.id,
      description: task.description,
      completed: task.completed ? '✓' : '✗'
    }));
  }
}

export default TodoList;