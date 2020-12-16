class PeaEventSystem {
  subs: Map<string, CallableFunction>
  constructor() {
    this.subs = new Map()
  }

  emit(event: string, args?: Array<any>) {}
  sub(event: string, cb: CallableFunction) {}
  unsub(event: string) {}
}

class PeaEventEmmiter {
  constructor() {
    window.onclick = function (ev: MouseEvent) {
      new PeaEventSystem().emit('')
    }
  }
}

class PeaEventConsumer {}

class PeaEvent {}
