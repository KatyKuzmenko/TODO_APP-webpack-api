export default class Todo {
  constructor(title) {
    this.id = +new Date();
    this.title = title;
    this.completed = false;
  }
}
