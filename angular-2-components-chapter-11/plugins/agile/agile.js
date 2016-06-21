import {PluginConfig, PluginPlacement} from '../../lib/plugin/plugin';
import {AgileTaskInfo} from './agile-task-info/agile-task-info';
import {AgileTaskDetail} from './agile-task-detail/agile-task-detail';

@PluginConfig({
  name: 'agile',
  description: 'Agile development plugin to manage story points on tasks',
  // The placement information tells our plugin system where to register what plugin components
  placements: [
    new PluginPlacement({slot: 'task-info', priority: 1, component: AgileTaskInfo}),
    new PluginPlacement({slot: 'task-detail', priority: 1, component: AgileTaskDetail})
  ]
})
export default class AgilePlugin {
  constructor() {
    // We're storing the available story points within the plugin itself where components can use the injected plugin to access them
    this.storyPoints = [0.5, 1, 2, 3, 5, 8, 13, 21];
  }
}
