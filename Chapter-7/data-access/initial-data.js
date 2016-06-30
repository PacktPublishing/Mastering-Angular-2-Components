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
      pictureDataUri: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDMxMS41IDMxMS41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMTEuNSAzMTEuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzMzMzMzMzt9DQo8L3N0eWxlPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNTUuOCwwQzY5LjcsMCwwLDY5LjcsMCwxNTUuOGMwLDM3LjUsMTMuMyw3MS45LDM1LjMsOTguOGMzLjQtMjcuMywzMC42LTUwLjMsNjguOC02MS4yDQoJCQljMTMuOSwxMywzMiwyMC45LDUxLjcsMjAuOWMxOS4yLDAsMzYuOS03LjUsNTAuNy0xOS45YzM4LjUsMTEuOSw2NS4xLDM2LjMsNjYsNjQuNmMyNC4zLTI3LjUsMzkuMS02My42LDM5LjEtMTAzLjENCgkJCUMzMTEuNSw2OS43LDI0MS44LDAsMTU1LjgsMHogTTE1NS44LDE5NS43Yy05LjksMC0xOS4zLTIuNy0yNy42LTcuNWMtMjAuMS0xMS40LTMzLjktMzQuOC0zMy45LTYxLjdjMC0zOC4xLDI3LjYtNjkuMiw2MS41LTY5LjINCgkJCWMzMy45LDAsNjEuNSwzMSw2MS41LDY5LjJjMCwyNy40LTE0LjIsNTEtMzQuOCw2Mi4yQzE3NC40LDE5My4yLDE2NS4zLDE5NS43LDE1NS44LDE5NS43eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K'
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
      pictureDataUri: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDMxMS41IDMxMS41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMTEuNSAzMTEuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzMzMzMzMzt9DQo8L3N0eWxlPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNTUuOCwwQzY5LjcsMCwwLDY5LjcsMCwxNTUuOGMwLDM3LjUsMTMuMyw3MS45LDM1LjMsOTguOGMzLjQtMjcuMywzMC42LTUwLjMsNjguOC02MS4yDQoJCQljMTMuOSwxMywzMiwyMC45LDUxLjcsMjAuOWMxOS4yLDAsMzYuOS03LjUsNTAuNy0xOS45YzM4LjUsMTEuOSw2NS4xLDM2LjMsNjYsNjQuNmMyNC4zLTI3LjUsMzkuMS02My42LDM5LjEtMTAzLjENCgkJCUMzMTEuNSw2OS43LDI0MS44LDAsMTU1LjgsMHogTTE1NS44LDE5NS43Yy05LjksMC0xOS4zLTIuNy0yNy42LTcuNWMtMjAuMS0xMS40LTMzLjktMzQuOC0zMy45LTYxLjdjMC0zOC4xLDI3LjYtNjkuMiw2MS41LTY5LjINCgkJCWMzMy45LDAsNjEuNSwzMSw2MS41LDY5LjJjMCwyNy40LTE0LjIsNTEtMzQuOCw2Mi4yQzE3NC40LDE5My4yLDE2NS4zLDE5NS43LDE1NS44LDE5NS43eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K'
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
      pictureDataUri: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDMxMS41IDMxMS41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMTEuNSAzMTEuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzMzMzMzMzt9DQo8L3N0eWxlPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNTUuOCwwQzY5LjcsMCwwLDY5LjcsMCwxNTUuOGMwLDM3LjUsMTMuMyw3MS45LDM1LjMsOTguOGMzLjQtMjcuMywzMC42LTUwLjMsNjguOC02MS4yDQoJCQljMTMuOSwxMywzMiwyMC45LDUxLjcsMjAuOWMxOS4yLDAsMzYuOS03LjUsNTAuNy0xOS45YzM4LjUsMTEuOSw2NS4xLDM2LjMsNjYsNjQuNmMyNC4zLTI3LjUsMzkuMS02My42LDM5LjEtMTAzLjENCgkJCUMzMTEuNSw2OS43LDI0MS44LDAsMTU1LjgsMHogTTE1NS44LDE5NS43Yy05LjksMC0xOS4zLTIuNy0yNy42LTcuNWMtMjAuMS0xMS40LTMzLjktMzQuOC0zMy45LTYxLjdjMC0zOC4xLDI3LjYtNjkuMiw2MS41LTY5LjINCgkJCWMzMy45LDAsNjEuNSwzMSw2MS41LDY5LjJjMCwyNy40LTE0LjIsNTEtMzQuOCw2Mi4yQzE3NC40LDE5My4yLDE2NS4zLDE5NS43LDE1NS44LDE5NS43eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K'
    },
    time: +Moment(now).subtract(2, 'hours'),
    subject: 'project-3',
    category: 'tasks',
    title: 'A task was updated',
    message: 'The task \'New task created\' was updated on #project-3.',
    _id: 'ECEF8127-C237-9612-924B-2A087D6FACA6'
  }
];
