type AttachmentProps = {
  name: string
  size: number
  fileId: string
  fileUrl: string
}

export class Attachment {
  readonly name: string
  readonly size: number
  readonly fileId: string
  readonly fileUrl: string

  private constructor(props: AttachmentProps) {
    this.name = props.name
    this.size = props.size
    this.fileId = props.fileId
    this.fileUrl = props.fileUrl
  }

  static create(props: AttachmentProps): Attachment {
    return new Attachment(props)
  }

  get roundedSize() {
    return Math.round(this.size / 1024)
  }

  get isImage(): boolean {
    return ['jpg', 'jpeg', 'png', 'gif'].includes(this.fileExtension)
  }

  get fileExtension(): string {
    return String(this.name.split('.').pop())
  }
}
