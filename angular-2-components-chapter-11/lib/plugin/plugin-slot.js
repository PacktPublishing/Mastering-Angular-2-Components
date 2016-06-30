import {Directive, Input, Inject, provide, ViewContainerRef, ComponentResolver, ReflectiveInjector} from '@angular/core';
import {PluginData} from './plugin';
import {PluginService} from './plugin-service';

@Directive({
  selector: 'ngc-plugin-slot'
})
export class PluginSlot {
  @Input() name;

  constructor(@Inject(ViewContainerRef) viewContainerRef, @Inject(ComponentResolver) componentResolver, @Inject(PluginService) pluginService) {
    this.viewContainerRef = viewContainerRef;
    this.componentResolver = componentResolver;
    this.pluginService = pluginService;
    this.componentRefs = [];
    // Subscribing to changes on the plugin service and re-initialize slot if needed
    this.pluginChangeSubscription = this.pluginService.change.subscribe(() => this.initialize());
  }

  initialize() {
    // If we don't have a valid name input, we shall return
    if (!this.name) {
      return;
    }

    // If we have already references to components within the plugin slot, we dispose them and clear the list
    if (this.componentRefs.length > 0) {
      this.componentRefs.forEach((componentRef) => componentRef.destroy());
      this.componentRefs = [];
    }

    // Using the PluginService we can obtain all placement information relevant to this slot
    const pluginData = this.pluginService.getPluginData(this.name);
    // Using the placement priority to sort plugin components relevant to this slot
    pluginData.sort(
      (a, b) => a.placement.priority < b.placement.priority ?
        1 : a.placement.priority > b.placement.priority ? -1 : 0);

    // Instantiating all plugin components relevant to this slot
    return Promise.all(pluginData.map((pluginData) => this.instantiatePluginComponent(pluginData)));
  }

  // Method to instantiate a single component based on plugin placement information
  instantiatePluginComponent(pluginData) {
    return this.componentResolver
      .resolveComponent(pluginData.placement.component)
      .then((componentFactory) => {
        // Get the injector of the plugin slot parent component
        const contextInjector = this.viewContainerRef.parentInjector;
        // Preparing additional PluginData provider for the created plugin component
        const providers = [
          provide(PluginData, {
            useValue: pluginData
          })
        ];
        // We're creating a new child injector and provide the PluginData provider
        const childInjector = ReflectiveInjector.resolveAndCreate(providers, contextInjector);
        // Now we can create a new component using the plugin slot view container and the resolved component factory
        const componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, childInjector);
        this.componentRefs.push(componentRef);
        // Perform change detection after component creation for OnPush and Detached parent views
        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
        return componentRef;
      });
  }

  // If the name input changes, we need to re-initialize the plugin components
  ngOnChanges() {
    this.initialize();
  }

  ngOnDestroy() {
    this.pluginChangeSubscription.unsubscribe();
  }
}
