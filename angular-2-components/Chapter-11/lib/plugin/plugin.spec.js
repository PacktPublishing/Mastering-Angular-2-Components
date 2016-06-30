import {describe, expect, it, inject, async, beforeEachProviders} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {By} from '@angular/platform-browser';
import {Component, Input, Injectable, provide} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {PluginConfig, PluginPlacement} from './plugin';
import {PluginService} from './plugin-service'
import {PluginSlot} from './plugin-slot';

@Injectable()
export class MockPluginService extends PluginService {
  constructor() {
    super();
    this.change = {
      subscribe() {}
    };
  }

  loadPlugins() {}
}

@Component({
  selector: 'dummy-plugin-component-1',
  template: 'dummy1'
})
export class DummyPluginComponent1 {}

@Component({
  selector: 'dummy-plugin-component-2',
  template: 'dummy2'
})
export class DummyPluginComponent2 {}

@Component({
  selector: 'dummy-application',
  template: 'dummy-slot:<ngc-plugin-slot name="dummy-slot"></ngc-plugin-slot>',
  directives: [PluginSlot]
})
export class DummyApplication {}

describe('PluginSlot', () => {
  beforeEachProviders(() => [
    provide(PluginService, {
      useClass: MockPluginService
    })
  ]);

  it('should create dummy component into designated slot',
    async(inject([TestComponentBuilder, PluginService], (tcb, pluginService) => {
      tcb.createAsync(DummyApplication).then((fixture) => {
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('dummy-slot:');

          @PluginConfig({
            name: 'dummy-plugin',
            description: 'Dummy Plugin',
            placements: [
              new PluginPlacement({slot: 'dummy-slot', priority: 1, component: DummyPluginComponent1})
            ]
          })
          class DummyPlugin {}

          pluginService.plugins = [{
            type: DummyPlugin,
            config: DummyPlugin._pluginConfig,
            instance: new DummyPlugin()
          }];

          const pluginSlot = fixture.debugElement
            .query(By.directive(PluginSlot))
            .injector
            .get(PluginSlot);

          pluginSlot.initialize().then(() => {
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('dummy-slot:dummy1');
          });
        });
    })
  ));

  it('should create two dummy components of same plugin into designated slot respecting priority',
    async(inject([TestComponentBuilder, PluginService], (tcb, pluginService) => {
      tcb.createAsync(DummyApplication).then((fixture) => {
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('dummy-slot:');

        @PluginConfig({
          name: 'dummy-plugin',
          description: 'Dummy Plugin',
          placements: [
            new PluginPlacement({slot: 'dummy-slot', priority: 1, component: DummyPluginComponent1}),
            new PluginPlacement({slot: 'dummy-slot', priority: 2, component: DummyPluginComponent2})
          ]
        })
        class DummyPlugin {}

        pluginService.plugins = [{
          type: DummyPlugin,
          config: DummyPlugin._pluginConfig,
          instance: new DummyPlugin()
        }];

        const pluginSlot = fixture.debugElement
          .query(By.directive(PluginSlot))
          .injector
          .get(PluginSlot);

        pluginSlot.initialize().then(() => {
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('dummy-slot:dummy2dummy1');
        });
      });
    })
  ));

  it('should create two dummy components of different plugins into designated slot respecting priority',
    async(inject([TestComponentBuilder, PluginService], (tcb, pluginService) => {
      tcb.createAsync(DummyApplication).then((fixture) => {
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('dummy-slot:');

        @PluginConfig({
          name: 'dummy-plugin',
          description: 'Dummy Plugin',
          placements: [
            new PluginPlacement({slot: 'dummy-slot', priority: 1, component: DummyPluginComponent1})
          ]
        })
        class DummyPlugin1 {}

        @PluginConfig({
          name: 'dummy-plugin',
          description: 'Dummy Plugin',
          placements: [
            new PluginPlacement({slot: 'dummy-slot', priority: 2, component: DummyPluginComponent2})
          ]
        })
        class DummyPlugin2 {}

        pluginService.plugins = [{
          type: DummyPlugin1,
          config: DummyPlugin1._pluginConfig,
          instance: new DummyPlugin1()
        }, {
          type: DummyPlugin2,
          config: DummyPlugin2._pluginConfig,
          instance: new DummyPlugin2()
        }];

        const pluginSlot = fixture.debugElement
          .query(By.directive(PluginSlot))
          .injector
          .get(PluginSlot);

        pluginSlot.initialize()
          .then(() => {
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('dummy-slot:dummy2dummy1');
          });
      });
    })
  ));

  it('should create two dummy components of same plugin into different slots',
    async(inject([TestComponentBuilder, PluginService], (tcb, pluginService) => {
      const template = 'dummy-slot1:<ngc-plugin-slot name="dummy-slot1"></ngc-plugin-slot>dummy-slot2:<ngc-plugin-slot name="dummy-slot2"></ngc-plugin-slot>';

      tcb.overrideTemplate(DummyApplication, template)
        .createAsync(DummyApplication).then((fixture) => {
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toBe('dummy-slot1:dummy-slot2:');

          @PluginConfig({
            name: 'dummy-plugin',
            description: 'Dummy Plugin',
            placements: [
              new PluginPlacement({slot: 'dummy-slot1', priority: 1, component: DummyPluginComponent1}),
              new PluginPlacement({slot: 'dummy-slot2', priority: 1, component: DummyPluginComponent2})
            ]
          })
          class DummyPlugin {}

          pluginService.plugins = [{
            type: DummyPlugin,
            config: DummyPlugin._pluginConfig,
            instance: new DummyPlugin()
          }];

          const pluginSlots = fixture.debugElement
            .queryAll(By.directive(PluginSlot))
            .map((debugElement) => debugElement.injector.get(PluginSlot));

          Promise.all(
            pluginSlots.map((pluginSlot) => pluginSlot.initialize())
          ).then(() => {
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('dummy-slot1:dummy1dummy-slot2:dummy2');
          });
        });
    })
  ));
});
