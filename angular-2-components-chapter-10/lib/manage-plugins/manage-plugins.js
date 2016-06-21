import {Component, Inject, ViewEncapsulation} from '@angular/core';
import template from './manage-plugins.html!text';
import {PluginService} from '../plugin/plugin-service.js';

@Component({
  selector: 'ngc-manage-plugins',
  host: {
    class: 'manage-plugins'
  },
  template,
  encapsulation: ViewEncapsulation.None
})
export class ManagePlugins {
  constructor(@Inject(PluginService) pluginService) {
    this.pluginService = pluginService;
    this.plugins = pluginService.change;
  }

  removePlugin(name) {
    this.pluginService.removePlugin(name);
  }

  loadPlugin(loadUrlInput) {
    this.pluginService.loadPlugin(loadUrlInput.value);
    loadUrlInput.value = '';
  }
}
