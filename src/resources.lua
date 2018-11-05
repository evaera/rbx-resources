local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Resources = require(ReplicatedStorage:WaitForChild("Resources"))

local export = setmetatable({}, {
  __index = function(_, k)
    return Resources:LoadLibrary(k)
  end
})

function export:Get(class, name)
  return Resources["Get" .. class](Resources, name)
end

function export:GetLocal(class, name)
  return Resources["GetLocal" .. class](Resources, name)
end

function export:GetLocalTable(name)
  return Resources:GetLocalTable(name)
end

return export