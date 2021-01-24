

const digit_models = [  "#zero", "#one", "#two", "#three", "#four", 
                        "#five", "#six", "#seven", "#eight", "#nine"
                    ];

function spawn_equation(a_val, b_val) {
    const box = document.createElement("a-entity");
    box.setAttribute("position", {x:0, y:1, z:start_z});

    const a = document.createElement("a-entity");
    a.setAttribute("gltf-model", digit_models[a_val]);
    a.setAttribute("position", {x:-0.5, y:0, z:0});
    a.setAttribute("apply_env_map", true);
    box.appendChild(a);

    const x = document.createElement("a-entity");
    x.setAttribute("gltf-model", "#x");
    x.setAttribute("position", {x:-0, y:0, z:0});
    x.setAttribute("apply_env_map", true);
    box.appendChild(x);

    const b = document.createElement("a-entity");
    b.setAttribute("gltf-model", digit_models[b_val]);
    b.setAttribute("position", {x:0.5, y:0, z:0});
    b.setAttribute("apply_env_map", true);
    box.appendChild(b);
    
    document.querySelector("a-scene").appendChild(box);
    box.a_node = a;
    return box;
}

const active_equations = [];
const start_z = -4.5;
const start_y = 3;
const max_z = 1;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

AFRAME.registerComponent("equation_spawner", {
    init: function() {
        const eq = spawn_equation(4,6);
        eq.a_node.setAttribute("gltf-model", "#zero")
        active_equations.push(eq);
    },
    tick: function() {

        const dead_list = [];

        active_equations.forEach(el => {
            el.object3D.position.z += 0.02
            if (el.object3D.position.z > max_z) {
                el.parentNode.removeChild(el);
                dead_list.push(el);
                active_equations.push(spawn_equation(4, getRndInteger(0, 9)));
            }
        });

        // clean up the active equations array
        let deleted_item_count = 0;
        dead_list.forEach(idx => {
            active_equations.splice(idx-deleted_item_count,1);
            deleted_item_count++;
        });





    }
  });
