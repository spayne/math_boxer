

const digit_models = [  "#zero", "#one", "#two", "#three", "#four", 
                        "#five", "#six", "#seven", "#eight", "#nine"
                    ];

function spawn_equation(a_val, b_val) {
    const box = document.createElement("a-entity");
    box.setAttribute("position", {x:0, y:1, z:-2.5});

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
}

AFRAME.registerComponent("equation_spawner", {

    init: function() {
        spawn_equation(2,6);
    }
  });
