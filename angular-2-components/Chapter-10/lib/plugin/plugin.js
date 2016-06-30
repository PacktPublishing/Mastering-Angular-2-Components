// Simple decorator that writes the first parameter onto the constructor of the annotated type
export function PluginConfig(config) {
  return (type) => {
    type._pluginConfig = config;
  };
}

// A class that can be used to configure plugin placements within @Plugin decorations
export class PluginPlacement {
  constructor(options) {
    this.slot = options.slot;
    this.priority = options.priority;
    this.component = options.component;
  }
}

// This class combines the instantiated plugin information with a placement object. This class is used to inject runtime information into plugin components
export class PluginData {
  constructor(plugin, placement) {
    this.plugin = plugin;
    this.placement = placement;
  }
}
