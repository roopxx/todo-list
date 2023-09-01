import { compareAsc, toDate } from "date-fns";
import Project from "./project";
import Task from "./task";

export default class TodoList {
  constructor() {
    this.projects = [
      new Project("Inbox"),
      new Project("Today"),
      new Project("This week"),
    ];
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  contains(projectName) {
    return this.projects.some((project) => project.getName() === projectName);
  }

  addProject(newProject) {
    if (
      this.projects.find(
        (project) => project.getName() === newProject.getName()
      )
    ) {
      return;
    }
    this.projects.push(newProject);
  }

  deleteProject(projectName) {
    const projectIndex = this.projects.findIndex(
      (project) => project.getName() === projectName
    );
    if (projectIndex !== -1) {
      this.projects.splice(projectIndex, 1);
    }
  }

  updateTodayProject() {
    const todayProject = this.getProject("Today");
    todayProject.setTasks([]);

    this.projects.forEach((project) => {
      if (project.getName() === "Today" || project.getName() === "This week") {
        return;
      }

      const todayTasks = project.getTasksToday();
      todayTasks.forEach((task) => {
        const taskName = `${task.getName()} (${project.getName()})`;
        todayProject.addTask(new Task(taskName, task.getDate()));
      });
    });
  }

  updateWeekProject() {
    const weekProject = this.getProject("This week");
    weekProject.setTasks([]);

    this.projects.forEach((project) => {
      if (project.getName() === "Today" || project.getName() === "This week") {
        return;
      }

      const weekTasks = project.getTasksThisWeek();
      weekTasks.forEach((task) => {
        const taskName = `${task.getName()} (${project.getName()})`;
        weekProject.addTask(new Task(taskName, task.getDate()));
      });
    });

    const sortedTasks = weekProject
      .getTasks()
      .sort((taskA, taskB) =>
        compareAsc(
          toDate(new Date(taskA.getDateFormatted())),
          toDate(new Date(taskB.getDateFormatted()))
        )
      );
    weekProject.setTasks(sortedTasks);
  }
}
