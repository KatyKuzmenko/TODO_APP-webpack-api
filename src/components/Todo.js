import Component from '../utils/Component';

export default class Todo extends Component {
  constructor(title) {
    super();
    this.id = +new Date();
    this.title = title;
    this.completed = false;
  }

  render() {
    super.render();
    // add code here
  }
}
