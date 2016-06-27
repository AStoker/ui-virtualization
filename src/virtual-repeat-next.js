import {inject} from 'aurelia-framework';
import {
  // BoundViewFactory,
  // ViewSlot,
  // ViewResources,
  // TargetInstruction,
   customAttribute,
  // bindable,
  //templateController,
  //View
} from 'aurelia-templating';
// import {DOM} from 'aurelia-pal';

//Placeholder attribute to prohibit use of this attribute name in other places

@customAttribute('virtual-repeat-next')
@inject(
    // DOM.Element,
    // BoundViewFactory,
    // TargetInstruction,
    // ViewSlot,
    // ViewResources,
    //ObserverLocator,
    //VirtualRepeatStrategyLocator,
    //TemplateStrategyLocator,
    //DomHelper
)
export class VirtualRepeatNext {

    constructor(
        // element: Element,
        // viewFactory: BoundViewFactory,
        // instruction: TargetInstruction,
        // viewSlot: ViewSlot,
        // viewResources: ViewResources,
        //observerLocator: ObserverLocator,
        //strategyLocator: VirtualRepeatStrategyLocator,
        //templateStrategyLocator: TemplateStrategyLocator,
    ){
        // this.element = element;
        // this.instruction = instruction;
    }

    attached(){
        //console.log(arguments);
    }

    bind(bindingContext, overrideContext): void {
      this.scope = { bindingContext, overrideContext };
      //overrideContext.parentOverrideContext.bindingContext[this.value]();
      //console.log(bindingContext[this.value]);
    }

}
