import Moment from 'moment';

const now = Moment(new Date());

export default [
  {
    _id: 'project-1',
    type: 'project',
    deleted: false,
    title: 'Your first project',
    description: 'This is your first project in the task management system you\'re building within the context of the Angular 2 Components book.',
    tasks: [{
      type: 'task',
      nr: 1,
      position: 0,
      title: 'Task 1',
      done: null,
      created: +Moment(now).subtract(8, 'hours'),
      efforts: {
        estimated: 86400000,
        effective: 0
      }
    }, {
      type: 'task',
      nr: 2,
      position: 1,
      title: 'Task 2',
      done: null,
      created: +Moment(now).subtract(20, 'hours'),
      efforts: {
        estimated: 259200000,
        effective: 0
      }
    }, {
      type: 'task',
      nr: 3,
      position: 2,
      title: 'Task 3',
      done: +Moment(now).subtract(2, 'hours'),
      created: +Moment(now).subtract(10, 'hours'),
      efforts: {
        estimated: 129600000,
        effective: 129600000
      }
    }, {
      type: 'task', nr: 4, position: 3, title: 'Task 4', done: false, created: +Moment(now).subtract(5, 'hours')
    }]
  }, {
    _id: 'project-2',
    type: 'project',
    deleted: false,
    title: 'Your second project',
    description: 'This is your second project in the task management system you\'re building within the context of the Angular 2 Components book.',
    tasks: [
      {
        type: 'task',
        nr: 1,
        position: 0,
        title: 'Task A',
        done: +Moment(now).subtract(30, 'hours'),
        created: +Moment(now).subtract(40, 'hours')
      },
      {
        type: 'task',
        nr: 2,
        position: 1,
        title: 'Task B',
        done: +Moment(now).subtract(15, 'hours'),
        created: +Moment(now).subtract(32, 'hours')
      },
      {
        type: 'task',
        nr: 3,
        position: 2,
        title: 'Task C',
        done: +Moment(now).subtract(22, 'hours'),
        created: +Moment(now).subtract(33, 'hours')
      },
      {
        type: 'task',
        nr: 4,
        position: 3,
        title: 'Task D',
        done: +Moment(now).subtract(5, 'hours'),
        created: +Moment(now).subtract(16, 'hours')
      },
      {type: 'task', nr: 5, position: 4, title: 'Task E', done: null, created: +Moment(now).subtract(40, 'hours')}
    ]
  }, {
    _id: 'project-3',
    type: 'project',
    deleted: false,
    title: 'Your third project',
    description: 'This is your third project in the task management system you\'re building within the context of the Angular 2 Components book.',
    tasks: [
      {type: 'task', nr: 1, position: 0, title: 'Task One', done: null, created: +Moment(now).subtract(2, 'hours')},
      {type: 'task', nr: 2, position: 1, title: 'Task Two', done: null, created: +Moment(now).subtract(1.5, 'hours')},
      {
        type: 'task',
        nr: 3,
        position: 3,
        title: 'Task Three',
        done: +Moment(now).subtract(1, 'hours'),
        created: +Moment(now).subtract(5, 'hours')
      }
    ]
  }, {
    type: 'activity',
    user: {
      name: 'You',
      pictureDataUri: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0aD0iMzExLjU0MXB4IiBoZWlnaHQ9IjMxMS41NDFweCIgdmlld0JveD0iMCAwIDMxMS41NDEgMzExLjU0MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzExLjU0MSAzMTEuNTQxOyIKCSB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTU1Ljc3MSwyNi4zMzFDNjkuNzQsMjYuMzMxLDAsOTYuMDcxLDAsMTgyLjEwMmMwLDM3LjQ4OCwxMy4yNSw3MS44ODMsMzUuMzE0LDk4Ljc2MQoJCQljMy40MDQtMjcuMjU2LDMwLjYyNy01MC4zMDgsNjguOC02MS4yMjVjMTMuOTQ2LDEyLjk5NCwzMS45NiwyMC44NzgsNTEuNjU2LDIwLjg3OGMxOS4yMzMsMCwzNi44OTQtNy40ODcsNTAuNjk4LTE5LjkzNgoJCQljMzguNTAzLDExLjg3MSw2NS4xNDEsMzYuMjcsNjYuMDE3LDY0LjYzYzI0LjI4NC0yNy40NzIsMzkuMDU2LTYzLjU1NSwzOS4wNTYtMTAzLjEwOAoJCQlDMzExLjU0MSw5Ni4wNzEsMjQxLjgwMSwyNi4zMzEsMTU1Ljc3MSwyNi4zMzF6IE0xNTUuNzcxLDIyMi4wNjljLTkuOTQ0LDAtMTkuMzE0LTIuNzMyLTI3LjYzNC03LjQ2NAoJCQljLTIwLjA1LTExLjQwOS0zMy44NTUtMzQuNzU2LTMzLjg1NS02MS43MTFjMC0zOC4xNDMsMjcuNTgzLTY5LjE3Niw2MS40ODktNjkuMTc2YzMzLjkwOSwwLDYxLjQ4OSwzMS4wMzMsNjEuNDg5LDY5LjE3NgoJCQljMCwyNy4zNjktMTQuMjM3LDUxLjAwNC0zNC43ODYsNjIuMjE1QzE3NC4zNzksMjE5LjUyMywxNjUuMzQ2LDIyMi4wNjksMTU1Ljc3MSwyMjIuMDY5eiIgZmlsbD0iIzQwNDA0MCIvPgoJPC9nPgo8L2c+Cjwvc3ZnPgo='
    },
    time: +Moment(now).subtract(8, 'hours'),
    subject: 'project-1',
    category: 'tasks',
    title: 'A task was updated',
    message: 'The task \'New task created\' was updated on #project-1.',
    _id: 'ECEF8127-C237-9612-924B-2A087D6FACA4'
  }, {
    type: 'activity',
    user: {
      name: 'You',
      pictureDataUri: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0aD0iMzExLjU0MXB4IiBoZWlnaHQ9IjMxMS41NDFweCIgdmlld0JveD0iMCAwIDMxMS41NDEgMzExLjU0MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzExLjU0MSAzMTEuNTQxOyIKCSB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTU1Ljc3MSwyNi4zMzFDNjkuNzQsMjYuMzMxLDAsOTYuMDcxLDAsMTgyLjEwMmMwLDM3LjQ4OCwxMy4yNSw3MS44ODMsMzUuMzE0LDk4Ljc2MQoJCQljMy40MDQtMjcuMjU2LDMwLjYyNy01MC4zMDgsNjguOC02MS4yMjVjMTMuOTQ2LDEyLjk5NCwzMS45NiwyMC44NzgsNTEuNjU2LDIwLjg3OGMxOS4yMzMsMCwzNi44OTQtNy40ODcsNTAuNjk4LTE5LjkzNgoJCQljMzguNTAzLDExLjg3MSw2NS4xNDEsMzYuMjcsNjYuMDE3LDY0LjYzYzI0LjI4NC0yNy40NzIsMzkuMDU2LTYzLjU1NSwzOS4wNTYtMTAzLjEwOAoJCQlDMzExLjU0MSw5Ni4wNzEsMjQxLjgwMSwyNi4zMzEsMTU1Ljc3MSwyNi4zMzF6IE0xNTUuNzcxLDIyMi4wNjljLTkuOTQ0LDAtMTkuMzE0LTIuNzMyLTI3LjYzNC03LjQ2NAoJCQljLTIwLjA1LTExLjQwOS0zMy44NTUtMzQuNzU2LTMzLjg1NS02MS43MTFjMC0zOC4xNDMsMjcuNTgzLTY5LjE3Niw2MS40ODktNjkuMTc2YzMzLjkwOSwwLDYxLjQ4OSwzMS4wMzMsNjEuNDg5LDY5LjE3NgoJCQljMCwyNy4zNjktMTQuMjM3LDUxLjAwNC0zNC43ODYsNjIuMjE1QzE3NC4zNzksMjE5LjUyMywxNjUuMzQ2LDIyMi4wNjksMTU1Ljc3MSwyMjIuMDY5eiIgZmlsbD0iIzQwNDA0MCIvPgoJPC9nPgo8L2c+Cjwvc3ZnPgo='
    },
    time: +Moment(now).subtract(30, 'hours'),
    subject: 'project-2',
    category: 'tasks',
    title: 'A task was updated',
    message: 'The task \'New task created\' was updated on #project-2.',
    _id: 'ECEF8127-C237-9612-924B-2A087D6FACA5'
  }, {
    type: 'activity',
    user: {
      name: 'You',
      pictureDataUri: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0aD0iMzExLjU0MXB4IiBoZWlnaHQ9IjMxMS41NDFweCIgdmlld0JveD0iMCAwIDMxMS41NDEgMzExLjU0MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzExLjU0MSAzMTEuNTQxOyIKCSB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTU1Ljc3MSwyNi4zMzFDNjkuNzQsMjYuMzMxLDAsOTYuMDcxLDAsMTgyLjEwMmMwLDM3LjQ4OCwxMy4yNSw3MS44ODMsMzUuMzE0LDk4Ljc2MQoJCQljMy40MDQtMjcuMjU2LDMwLjYyNy01MC4zMDgsNjguOC02MS4yMjVjMTMuOTQ2LDEyLjk5NCwzMS45NiwyMC44NzgsNTEuNjU2LDIwLjg3OGMxOS4yMzMsMCwzNi44OTQtNy40ODcsNTAuNjk4LTE5LjkzNgoJCQljMzguNTAzLDExLjg3MSw2NS4xNDEsMzYuMjcsNjYuMDE3LDY0LjYzYzI0LjI4NC0yNy40NzIsMzkuMDU2LTYzLjU1NSwzOS4wNTYtMTAzLjEwOAoJCQlDMzExLjU0MSw5Ni4wNzEsMjQxLjgwMSwyNi4zMzEsMTU1Ljc3MSwyNi4zMzF6IE0xNTUuNzcxLDIyMi4wNjljLTkuOTQ0LDAtMTkuMzE0LTIuNzMyLTI3LjYzNC03LjQ2NAoJCQljLTIwLjA1LTExLjQwOS0zMy44NTUtMzQuNzU2LTMzLjg1NS02MS43MTFjMC0zOC4xNDMsMjcuNTgzLTY5LjE3Niw2MS40ODktNjkuMTc2YzMzLjkwOSwwLDYxLjQ4OSwzMS4wMzMsNjEuNDg5LDY5LjE3NgoJCQljMCwyNy4zNjktMTQuMjM3LDUxLjAwNC0zNC43ODYsNjIuMjE1QzE3NC4zNzksMjE5LjUyMywxNjUuMzQ2LDIyMi4wNjksMTU1Ljc3MSwyMjIuMDY5eiIgZmlsbD0iIzQwNDA0MCIvPgoJPC9nPgo8L2c+Cjwvc3ZnPgo='
    },
    time: +Moment(now).subtract(2, 'hours'),
    subject: 'project-3',
    category: 'tasks',
    title: 'A task was updated',
    message: 'The task \'New task created\' was updated on #project-3.',
    _id: 'ECEF8127-C237-9612-924B-2A087D6FACA6'
  }
];
