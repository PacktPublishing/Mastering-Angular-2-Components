import {Injectable} from '@angular/core';
import {PluginData} from './plugin';
import {ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class PluginService {
  constructor() {
    this.plugins = [];
    // Change observable if the list of active plugin changes
    this.change = new ReplaySubject(1);
    this.loadPlugins();
  }

  // This function loads all pre-configured plugins from the root plugins.js file
  loadPlugins() {
    System.import('/plugins.js').then((pluginsModule) => {
      pluginsModule.default.forEach((pluginUrl) => this.loadPlugin(pluginUrl));
    });
  }

  // Loads one individual plugin, instantiates it and returns a Promise to the plugin runtime information
  loadPlugin(url) {
    return System.import(url).then((pluginModule) => {
      const Plugin = pluginModule.default;
      const pluginData = {
        url,
        type: Plugin,
        // Reading the meta data previously stored by the @Plugin decorator
        config: Plugin._pluginConfig,
        // Creates the plugin instance
        instance: new Plugin()
      };

      this.plugins = this.plugins.concat([pluginData]);
      this.change.next(this.plugins);
    });
  }

  // Removes a plugin from the plugins list
  removePlugin(name) {
    const plugin = this.plugins.find((plugin) => plugin.name === name);
    if (plugin) {
      // If the plugin was found by name, we remove it from the list and emit a change event
      const plugins = this.plugins.slice();
      plugins.splice(plugins.indexOf(plugin), 1);
      this.plugins = plugins;
      this.change.next(this.plugins);
    }
  }

  // Get all plugin data objects for a given slot name
  getPluginData(slot) {
    return this.plugins.reduce((components, pluginData) => {
      return components.concat(
        pluginData.config.placements
          .filter((placement) => placement.slot === slot)
          .map((placement) => new PluginData(pluginData, placement))
      );
    }, []);
  }
}
