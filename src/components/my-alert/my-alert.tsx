import { Component, Prop, h, State, Event, EventEmitter, Listen } from '@stencil/core';


export interface AcknowledgeEvent {
  when: Date;
}

@Component({
  tag: 'my-alert',
  styleUrl: 'my-alert.css',
  scoped: true
})
export class MyAlert {

  @Prop() text: string="This is an important alert!"
  @Prop() kind: "info" | "success" | "error" = "info";
  @State() acknowledged: boolean = false;
  @Event() acknowledge: EventEmitter<AcknowledgeEvent>;


  // componentDidLoad() {
  //   console.log("Fully Loaded");
  // }

  // componentDidUpdate() {
  //   console.log("Component Updated");
  // }

  @Listen("click")
  handleClick() {
    this.acknowledged = true;
    this.acknowledge.emit({
      when: new Date()
    });
  }

  getCSSClass = () => this.kind + (this.acknowledged ? " acknowledged" : "");

  render() {
    return (
      <p class={this.getCSSClass()}>
        {this.text}
        <span>Acknowledge</span>
      </p>
    )
  }
}

