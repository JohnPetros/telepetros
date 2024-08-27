type Callback = (payload: unknown) => void

type Pipes = Record<string, Callback[]>

export class PubSub {
  private readonly pipes: Pipes = {}

  subscribe(pipeName: string, callback: Callback) {
    if (!this.pipes[pipeName]) {
      this.pipes[pipeName] = []
    }

    console.log(this.pipes[pipeName])
    this.pipes[pipeName].push(callback)
  }

  publish(pipeName: string, payload: unknown) {
    if (!this.pipes[pipeName]) {
      return
    }

    for (const callback of this.pipes[pipeName]) {
      console.log(callback)
      callback(payload)
    }
  }
}
