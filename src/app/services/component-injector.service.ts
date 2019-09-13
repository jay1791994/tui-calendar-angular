import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef,
  EmbeddedViewRef, Injectable, Injector, Type, ViewContainerRef,
} from '@angular/core';

import { ScheduleViewComponent } from '../components/schedule-view/schedule-view.component';
import { ScheduleDiscription } from '../models/ScheduleDiscription.model';



@Injectable({
  providedIn: 'root'
})
export class ComponentInjectorService {



    createdInstance: Object;
 
    constructor(
        private cfr: ComponentFactoryResolver,
        private defaultInjector: Injector,
        private appRef: ApplicationRef) {
    }
  
    createComponent<T>(
        componentType: Type<T>,
        schedule :ScheduleDiscription,
        location?: HTMLElement | ViewContainerRef,
        injector?: Injector): ComponentRef<T> {
  
      let componentFactory = this.cfr.resolveComponentFactory(componentType);
  
      let componentRef: ComponentRef<T>;
       componentRef = componentFactory.create(injector || this.defaultInjector);
       
        this.createdInstance = componentRef.instance;
        let instance = <ScheduleViewComponent>this.createdInstance;
        instance.scheduleDiscription = schedule;
        this.appRef.attachView(componentRef.hostView);
  
        this.addComponentToDom(location as HTMLElement || document.body, componentRef);
    
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