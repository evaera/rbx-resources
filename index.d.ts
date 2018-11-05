/// <reference types="rbx-types" />

export function Get<T extends Instance>(className: string, name: string): T
export function GetLocal<T extends Instance>(className: string, name: string): T
export function GetLocalTable(name: string): object

export class Janitor {
  public Add<T extends any> (object: T, methodName?: string | true, index?: string): T
  public Remove (index: string): void
  public Cleanup (): void
  public LinkToInstance<T extends Instance> (instance: T, allowMultiple?: boolean): RBXScriptConnection
}