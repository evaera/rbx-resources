/// <reference types="rbx-types" />

interface Resources {
  Get<T extends Instance> (className: string, name: string): T
  GetLocal<T extends Instance> (className: string, name: string): T
  GetLocalTable (name: string): object
}

export const Resources: Resources

export class Janitor {
  public Add<T extends any> (object: T, methodName?: string | true, index?: string): T
  public Remove (index: string): void
  public Cleanup (): void
  public LinkToInstance<T extends Instance> (instance: T, allowMultiple?: boolean): RBXScriptConnection
}