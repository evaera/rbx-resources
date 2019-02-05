return setmetatable({}, {
	__index = function(self, className)
		local constructor = setmetatable(
			{
				new = function(parent)
					return Instance.new(className, parent)
				end,
				instanceof = function(value)
					return typeof(value) == "Instance" and value:IsA(className)
				end,
			},
			{
				__tostring = function()
					return className
				end
			}
		)
		self[className] = constructor
		return constructor
	end
})