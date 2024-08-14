export abstract class Entity<Props> {
  readonly id: string
  protected readonly props: Props

  protected constructor(props: Props, id?: string) {
    this.id = id ?? ''
    this.props = props
  }
}
