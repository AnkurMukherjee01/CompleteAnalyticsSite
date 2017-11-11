import { Component, Input, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';

import { OnTabSelect } from './on-tab-select.interface';
import { OnTabDeselect } from './on-tab-deselect.interface';

@Component({
    selector: 'tab',
    styles: [`
        .pane{
          padding: 1em;
        }
    `],
    template: `
        <div [hidden]="!active" class="pane">
          <ng-content></ng-content>
        </div>
    `
})
export class TabComponent {
    @Input() tabId: any;

    @Input() tabTitle: string;

    @Input() tabIcon: string;

    @Output()
    selected: EventEmitter<null> = new EventEmitter<null>();

    @Output()
    deselected: EventEmitter<null> = new EventEmitter<null>();

    private _active: boolean = false;

    @Input()
    get active(): boolean {
        return this._active;
    }

    set active(active: boolean) {
        let changed: boolean = this.active !== active;
        this._active = active;
        //Run onTabSelected for all tab children if active changed from false to true
        if (changed && this.active === true) {
            for (let onTabSelectComponent of this.onTabSelectComponents.toArray()) {
                onTabSelectComponent.onTabSelected();
            }
            this.selected.emit();
        }
        if (changed && this.active === false) {
            for (let onTabDeselectComponent of this.onTabDeselectComponents.toArray()) {
                onTabDeselectComponent.onTabDeselected();
            }
            this.deselected.emit();
        }
    }

    @Input() disabled: boolean = false;
    @Input() href: string = ''; //TODO: Add option to make into link or routerlink
    @ContentChildren(OnTabSelect)
    onTabSelectComponents: QueryList<OnTabSelect>;

    @ContentChildren(OnTabDeselect)
    onTabDeselectComponents: QueryList<OnTabDeselect>;
}