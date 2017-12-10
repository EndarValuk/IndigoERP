class Envelope<T> {
  public constructor(public Value: T, public Type: number, public Message?: string) {
  }
}

export { Envelope };