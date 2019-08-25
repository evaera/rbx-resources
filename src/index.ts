import { Folder } from '@rbxts/new'
import { Players, ReplicatedStorage, RunService, ServerStorage } from '@rbxts/services'

const RESOURCES_NAME = 'Resources'

const isClient = RunService.IsClient()

function getInstance<T extends Instance = Instance> (instanceType: (new () => T) | string, name: string, parent: Instance, waitForChild?: boolean): T {
  if (waitForChild) {
    return parent.WaitForChild<T>(name)
  } else {
    let instance = parent.FindFirstChild<T>(name)
    if (!instance) {
      if (typeIs(instanceType, 'string')) {
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
const getLocalRootFolder = () => getInstance(Folder, RESOURCES_NAME, isClient ? Players.LocalPlayer : ServerStorage)

export function getResource<T extends Instance = Instance> (resourceType: (new () => T) | string, name: string): T {
  return getInstance(resourceType, name, getInstance(Folder, typeIs(resourceType, 'string') ? resourceType : tostring(resourceType), getRootFolder(), isClient), isClient)
}

export function getLocalResource<T extends Instance = Instance> (resourceType: (new () => T) | string, name: string): T {
  return getInstance(resourceType, name, getInstance(Folder, typeIs(resourceType, 'string') ? resourceType : tostring(resourceType), getLocalRootFolder()))
}
