export class Attachment {
  private constructor(
    readonly name: string,
    readonly value: string,
  ) {}

  static create(name: string, value: string): Attachment {
    return new Attachment(name, value)
  }

  get isImage() {
    return this.value.slice(this.value.length - 3)
  }
}
