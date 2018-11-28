import { RunService, ReplicatedStorage, ServerStorage, Players } from 'rbx-services'

const RESOURCES_NAME = 'Resources'

const isClient = RunService.IsClient()

function getInstance<T extends Instance = Instance> (instanceType: (new () => T) | string, name: string, parent: Instance, waitForChild?: boolean): T {
  if (waitForChild) {
    return parent.WaitForChild<T>(name)
  } else {
    let instance = parent.FindFirstChild<T>(name)
    if (!instance) {
      if (typeof instanceType === 'string') {
        throw `Resource folder ${instanceType} is not present inside ${parent.GetFullName()}`
      } else {
        instance = new instanceType()
        instance.Name = name
        instance.Parent = parent
      }
    }

    return instance
  }
}

const getRootFolder = () => getInstance(Folder, RESOURCES_NAME, ReplicatedStorage, isClient)
const getLocalRootFolder = () => getInstance(Folder, RESOURCES_NAME, isClient ? Players.LocalPlayer! : ServerStorage)

export function getResource<T extends Instance = Instance> (type: (new () => T) | string, name: string): T {
  return getInstance(type, name, getInstance(Folder, typeof type === 'string' ? type : tostring(type), getRootFolder(), isClient), isClient)
}

export function getLocalResource<T extends Instance = Instance> (type: (new () => T) | string, name: string): T {
  return getInstance(type, name, getInstance(Folder, typeof type === 'string' ? type : tostring(type), getLocalRootFolder()))
}
