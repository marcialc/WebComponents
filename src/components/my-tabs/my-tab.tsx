import { Component, h, Prop, Event, EventEmitter, Listen } from '@stencil/core';

export interface TabActivateEvent {
    name: string;
}

@Component({
    tag: "my-tab",
    styleUrl: "my-tab.css",
    scoped: true
})

export class MyTab {

    @Prop() name: string;
    @Prop() active: boolean;
    @Event() tabActivate: EventEmitter<TabActivateEvent>;
    
    @Listen("click")
    handleClick () {
        this.active = true;
        this.tabActivate.emit({name: this.name});
    }

    render() {
        return(
            <div class={this.getCSSClass()}>
                <slot />
            </div>
        );
    }


    getCSSClass = () => this.active ? "my-tab active" : "my-tab";
}


