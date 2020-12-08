import { Pea } from '../pea'

export abstract class Script {
  protected pea!: Pea

  setPea(pea: Pea): void {
    this.pea = pea
  }

  onUpdate(): void {}
}
