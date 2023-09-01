export default class Task {
  constructor(name, dueDate = "No date") {
    this.name = name;
    this.dueDate = dueDate;
    this.completed = false;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDate(dueDate) {
    this.dueDate = dueDate;
  }

  getDate() {
    return this.dueDate;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }

  getDateFormatted() {
    const [day, month, year] = this.dueDate.split("/");
    return `${month}/${day}/${year}`;
  }
}
