import { Pea } from './pea'

export abstract class Script {
  protected pea!: Pea

  initialize(pea: Pea): void {
    this.pea = pea
    this.onStart()
  }

  onStart(): void {}
  onUpdate(): void {}
}
