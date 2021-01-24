# paste this script into the ballonsnumbers.blend console to export each
# balloon as a separate gltf file

# export a single object into a gltf file
# selects it, centers it, rotates it, exports and then puts it back.
# 
def export_model(object_name, filename):
	print('exporting ' + object_name + ' to ' + filename, flush=True)
	bpy.ops.object.select_all(action='DESELECT')
	obj = bpy.data.objects[object_name]
	obj.select_set(True)
	old_rot = obj.rotation_euler[2]
	old_location = obj.location.copy()
	obj.rotation_euler[2] = math.radians(0)
	obj.location = 0,0,0
	args={
		'export_format': 'GLB',
		'filepath' : filename,
		'use_selection' : True
	}
	bpy.ops.export_scene.gltf(**args)

#
# export all balloon models
#
items = \
[
["one", "Text"],
["two", "Text.001"],
["three", "Text.002"],
["four", "Text.003"],
["five", "Text.004"],
["six", "Text.005"],
["seven", "Text.006"],
["eight", "Text.007"],
["nine", "Text.008"],
["zero", "Text.009"]
]

for object in items:
	export_model(object[1], 'c:/temp/' + object[0])

