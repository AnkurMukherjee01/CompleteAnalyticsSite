//Runs onTabDeselected() function when tab containing component is deselected
export abstract class OnTabDeselect {
    abstract onTabDeselected(): void;
}

/**
 * 1. import OnTabDeselect and implement in class:
 *      class ExampleComponent implements OnTabDeselect { onTabDeselected(){ } }
 * 2. Add to component providers:
 *      providers: [{ provide: OnTabDeselect, useExisting: forwardRef(() => ExampleComponent) }]
 */