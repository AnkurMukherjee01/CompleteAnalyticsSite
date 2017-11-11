//Runs onTabSelected() function when tab containing component is selected
export abstract class OnTabSelect {
    abstract onTabSelected(): void;
}

/**
 * 1. import OnTabSelect and implement in class:
 *      class ExampleComponent implements OnTabSelect { onTabSelected(){ } }
 * 2. Add to component providers:
 *      providers: [{ provide: OnTabSelect, useExisting: forwardRef(() => ExampleComponent) }]
 */