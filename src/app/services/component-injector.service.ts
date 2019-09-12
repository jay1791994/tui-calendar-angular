import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef,
  EmbeddedViewRef, Injectable, Injector, Type, ViewContainerRef
} from '@angular/core';

import { Schedule } from '../../../projects/ngx-tui-calendar/src/lib/Models/Schedule';
import { ScheduleViewComponent } from '../components/schedule-view/schedule-view.component';
import { ScheduleDiscription } from '../models/ScheduleDiscription.model';



@Injectable({
  providedIn: 'root'
})
export class ComponentInjectorService {
 
    constructor(
        private cfr: ComponentFactoryResolver,
        private defaultInjector: Injector,
        private appRef: ApplicationRef) {
    }
  
    /**
     * Instantiates a component and adds it to the DOM.
     * @constructor
     * @param {Type<T>} componentType - Type of the component to create, e.g. "DynamicComponent".
     * @param {HTMLElement | ViewContainerRef} location - (Optional) Location where to inject the
     * component in the DOM, can be an arbitrary HTML element or a ViewContainerRef.
     * @param {Injector} injector - (Optional) Injector that should be used as a parent injector
     * for the component. This is useful only if you want to inject into the component services
     * that are provided in a different place from where ComponentFactoryService is provided.
     */
    createComponent<T>(
        componentType: Type<T>,
        schedule :ScheduleDiscription,
        location?: HTMLElement | ViewContainerRef,
        injector?: Injector): ComponentRef<T> {
  
      // Grab the instance of a factory for our component from Angular module.
      // Important: the component needs to be added to the "entryComponents" as part of the
      // "@NgModule" declaration on the same
      // module where this service is added to the "providers".
      let componentFactory = this.cfr.resolveComponentFactory(componentType);
  
      let componentRef: ComponentRef<T>;
  
      // We can handle two scenarios here depending on how the location where the component
      // needs to be injected is provided:
      // 1. ViewContainerRef. In this case we can just call location.createComponent and the
      //    component will be added as a child of the container automatically.
      // 2. HTMLElement. This can be just any HTML element in the DOM, even outside of the Angular
      //    application.
  
     // if (location && location instanceof ViewContainerRef) {
        // The component will be added as a child of the container host view
       // componentRef = location.createComponent(
          //componentFactory,
         // undefined /* index */,
         // injector || this.defaultInjector);
     // }
     // else {
        // Here the location is any HTML element (could be outside of Angular app), so we need a bit
        // more work to "attach" it to our Angular app.
  
        // 1. Instantiate the component
        componentRef = componentFactory.create(injector || this.defaultInjector);
       
        let createdInstance = <ScheduleViewComponent><unknown>componentRef.instance;
        createdInstance.scheduleDiscription = schedule;
       

        // 2. Attach the component to the Angular application so that Angular knows about the
        //    component and performs change detection on it.
        this.appRef.attachView(componentRef.hostView);
  
        // 3. Insert the component HTML view as a child of the given HTML element or just as
        //    a child of "body" if no element is provided.
        this.addComponentToDom(location as HTMLElement || document.body, componentRef);
    //  }
  
      console.log(componentRef);
      return componentRef;
    }
  
    private addComponentToDom<T>(parent: HTMLElement, componentRef: ComponentRef<T>): HTMLElement {
      // Grabe the actual HTML element of the component
      let componentElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
     
     parent.appendChild(componentElement);
  
      return componentElement;
    }
}