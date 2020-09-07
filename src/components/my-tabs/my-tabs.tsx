import { Component, h, Listen, Element, Prop, Watch } from '@stencil/core';

import { TabActivateEvent } from "./my-tab";

@Component({
    tag:"my-tabs",
    styleUrl:"my-tabs.css",
    scoped: true
})

export class MyTabs {

    @Prop({mutable:true}) activeTab: string; 

    @Watch("activeTab")
    handleActiveTabChange(newValue: string){
        const headings = this.getHeadings();
        headings.forEach(heading => {
            if(heading.name === newValue){
                heading.active = true;
            }else{
                heading.active = false;
            }
        })
    }

    @Element() element;

    @Listen("tabActivate")
    handleTabActivate(e: CustomEvent<TabActivateEvent>) {
        this.activeTab = e.detail.name;
    }

    componentDidLoad() {
        if (this.activeTab === undefined){
            const headings = this.getHeadings();
            const haveActiveTab = headings.filter(heading => heading.active).length > 0;
            if(!haveActiveTab && headings.length > 0) {
                this.activeTab = headings[0].name;
            }
        }else{
            this.handleActiveTabChange(this.activeTab);
        }
    }

    render() {
        return(
            <div class="my-tabs-container">
                <slot />
            </div>
        );
    }

    getHeadings = () => [].slice.call(this.element.querySelector(".my-tabs-container").children)
    .filter(child => child.tagName.toLowerCase() === "my-tab");
}