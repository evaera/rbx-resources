# rbx-resources

rbx-resources lets you easily access game assets and create named instances in your game.

rbx-resources exports two functions: `getResource` and `getLocalResource`.

## `getResource` with Instances

When you call `getResource` with an Instance value from the `rbx-new` package and a name from the server, rbx-resources will:

- Create a folder named `Resources` in ReplicatedStorage if it doesn't already exist
- Create a sub-folder named after the ClassName of the Instance type
- Instantiate that Instance on the server, set its name to what you specified, and then parent it to the sub-folder.

When you call `getResource` from the client, it will follow the same process above, except it will use `WaitForChild` instead of creating new instances.

This means that getting the same RemoteEvent on both the server and client is as easy as this:

```ts
import { RemoteEvent } from 'rbx-new';
const event = getResource(RemoteEvent, "SomeRemoteEvent");
```

## `getResource` with custom types

You can also call `getResource` with a string instead of an Instance type as the first parameter. This will follow roughly the same process as above, but for prefabricated instances that you would have already placed in the `Resources` folder in Studio.

For example, you could create a `Weapon` folder inside of the `Resources` folder in ReplicatedStorage, and then you can place named weapon models inside of it. Then, in your code:

```ts
const sword = getResource<Model>("Weapon", "Darkheart");
```

## `getLocalResource`

`getLocalResource` is very similar to `getResource`, except it does not replicate across the network.

On the server, calling `getLocalResource` will look for or create a `Resources` folder inside ServerStorage.

On the client, it will look for or create a `Resources` folder inside the Player object.

This is useful for things like BindableEvents, where they don't need to exist on the server:

```ts
const event = getLocalResource(BindableEvent, "FooBarBaz");
```

## Credits

rbx-resources is inspired by [RoStrap's Resources library](https://github.com/RoStrap/Resources).
