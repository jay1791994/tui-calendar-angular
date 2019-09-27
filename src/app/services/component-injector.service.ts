import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef,
  EmbeddedViewRef, Injectable, Injector, Type, ViewContainerRef,
} from '@angular/core';

import { ScheduleViewComponent } from '../components/schedule-view/schedule-view.component';

import { Schedule } from '../../../projects/ngx-tui-calendar/src/lib/Models/Schedule';



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
  
    createSchduleViewComponent<T>(
        componentType: Type<T>,
        schedule?:Schedule,
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
    
      
      return componentRef;
    }


    createSchduleCreateComponent<T>(
      componentType: Type<T>,
      location?: HTMLElement | ViewContainerRef,
      injector?: Injector): ComponentRef<T> {

    let componentFactory = this.cfr.resolveComponentFactory(componentType);

    let componentRef: ComponentRef<T>;
     componentRef = componentFactory.create(injector || this.defaultInjector);
     
      this.createdInstance = componentRef.instance;
     
      this.appRef.attachView(componentRef.hostView);

      this.addComponentToDom(location as HTMLElement || document.body, componentRef);
  
   
    return componentRef;
  }

  
    private addComponentToDom<T>(parent: HTMLElement, componentRef: ComponentRef<T>): HTMLElement {
      // Grabe the actual HTML element of the component
      let componentElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      parent.appendChild(componentElement);
      return componentElement;
    }
}