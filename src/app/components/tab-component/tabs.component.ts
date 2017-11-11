import { Component, ContentChildren, QueryList, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { TabComponent } from './tab.component';


@Component({
    selector: 'tabs',
    template: `
        <ul class="nav nav-tabs">
            <li *ngFor="let tab of tabs" [class.active]="tab.active" [class.disabled]="tab.disabled">
            <a role="tab" [href]="tab.href" (click)="selectTab(tab, $event)">
            <i *ngIf="tab.tabIcon" class="glyphicon glyphicon-{{tab.tabIcon}}"></i>{{tab.tabTitle}}
            </a>
            </li>
            <li style="float: right"><button class="btn btn-download" (click)="downloadClick()"><span>Download</span><i class="glyphicon glyphicon-download"></i></button></li>
        </ul>
        <ng-content></ng-content>
    `
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    @Output() tabChangeEmitter = new EventEmitter<number>();

    @Output() downloadEvent = new EventEmitter<any>();
    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        let activeTabs = this.tabs.filter((tab) => tab.active);

        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    findTabIndexById(id: any): number {
        
        
        let tabIndex = 0;
        for (let tab of this.tabs.toArray()) {
            if (tab.tabId === id) {
                return tabIndex;
            }
            else {
                ++tabIndex;
            }
        }
        return null;
    }

    findTabIndexByTitle(title: string): number {
        
        
        let tabIndex = 0;
        for (let tab of this.tabs.toArray()) {
            if (tab.tabTitle === title) {
                return tabIndex
            }
            else {
                ++tabIndex;
            }
        }
        return null;
    }

    selectTab(tab: TabComponent, event: Event = null, force: boolean = false): void {
        let tabs = this.tabs.toArray();
        if ((force || !tab.disabled) && !tab.href) {
            let hasChanged = tab.active === false;
            this.tabs.toArray().forEach(t => t.active = t === tab);
            if (hasChanged) {
                //Send event that active tab has changed
                this.tabChangeEmitter.emit(this.currentIndex());
            }
        }

        if (!!event && (!tab.href || (tab.href && (force || !tab.disabled)))) {
            event.preventDefault();
        }
    }

    selectTabByIndex(index: number): boolean {
        let tabs = this.tabs.toArray();
        if (index in tabs) {
            //TODO: currently forcing tab change even if disabled because of current implementation
            this.selectTab(tabs[index], null, true);
            return true;
        } else {
            return false;
        }
    }

    selectTabById(id: any): boolean {
        let tabs = this.tabs.toArray();
        let index = this.findTabIndexById(id);
        if (index in tabs) {
            //TODO: currently forcing tab change even if disabled because of current implementation
            this.selectTab(tabs[index], null, true);
            return true;
        } else {
            return false;
        }
    }

    selectTabOffset(offset: number): boolean {
        let currentIndex = this.currentIndex();
        if (currentIndex === null) return false;
        if ((currentIndex + offset) in this.tabs.toArray()) {
            this.selectTabByIndex(currentIndex + offset);
            return true;
        } else {
            return false;
        }
    }

    selectTabNext(offset: number = 1): boolean {
        return this.selectTabOffset(offset);
    }

    selectTabPrev(offset: number = 1): boolean {
        return this.selectTabOffset(-offset);
    }

    currentIndex(): number {
        for (let index in this.tabs.toArray()) {
            if (this.tabs.toArray()[index].active) {
                return Number(index);
            }
        }
        return null; //no active tab found
    }
    downloadClick(): void{
        this.downloadEvent.emit();
    }
}