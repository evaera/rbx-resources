local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Resources = require(ReplicatedStorage:WaitForChild("Resources"))

local export = setmetatable({}, {
  __index = function(_, k)
    return Resources:LoadLibrary(k)
  end
})

export.Reources = setmetatable({}, { __index = Resources })

function export.Resources:Get(class, name)
  return Resources["Get" .. class](Resources, name)
end

function export.Resources:GetLocal(class, name)
  return Resources["GetLocal" .. class](Resources, name)
end

function export.Resources:GetLocalTable(name)
  return Resources:GetLocalTable(name)
end

return export