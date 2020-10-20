require("./main.css")
require("./test_env_map_main.html")

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../source_assets/', true, /\.jpg$/));




const aframe = require("aframe");

const { GUI } = require('three/examples/jsm/libs/dat.gui.module');
const {OrbitControls} = require('three/examples/jsm/controls/OrbitControls');



  document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    init();
	animate();

	function init() {

		// CAMERAS

		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.set( 0, 0, 1000 );

		// SCENE
		scene = new THREE.Scene();

		// Lights

		var ambient = new THREE.AmbientLight( 0xffffff );
		scene.add( ambient );


		// Manager
		var manager = new THREE.LoadingManager();
		manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
			console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
		};

		manager.onLoad = function ( ) {
			console.log( 'Loading complete!');
		};

		manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
			console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
		};

		manager.onError = function ( url ) {
			console.log( 'There was an error loading ' + url );
		};

		// Textures

		var loader = new THREE.CubeTextureLoader(manager);
		
		
	
		loader.setPath( './assets/' );

		textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
		textureCube.encoding = THREE.sRGBEncoding;
		var textureLoader = new THREE.TextureLoader(manager);

		textureEquirec = textureLoader.load( 'assets/2294472375_24a3b8ef46_o.jpg' );
		textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
		textureEquirec.encoding = THREE.sRGBEncoding;

		
		//scene.background = textureCube;


		var gltf_loader = new THREE.GLTFLoader(manager);
		gltf_loader.load(
			// resource URL
			'./assets/five.glb',
			// called when the resource is loaded
			function ( gltf ) 
			{
				console.log('aha!');
		
				scene.add( gltf.scene );
		
				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object
		
			},
			// called while loading is progressing
			function ( xhr ) {

				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

			},
			// called when loading has errors
			function ( error ) {

				console.log( 'An error happened' );

			}
		);



		var geometry = new THREE.IcosahedronBufferGeometry( 400, 5 );
		//var geometry = new THREE.IcosahedronBufferGeometry( 400, 15 );
		
		sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureCube } );
		sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
		sphereMesh.position.x = 50;
		sphereMesh.position.y = 5;
		scene.add( sphereMesh );

		//
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.outputEncoding = THREE.sRGBEncoding;
		document.body.appendChild( renderer.domElement );

		controls = new OrbitControls( camera, renderer.domElement );
		controls.minDistance = 500;
		controls.maxDistance = 2500;

        var params = {
            Cube: function () {

                scene.background = textureCube;

                sphereMaterial.envMap = textureCube;
                sphereMaterial.needsUpdate = true;

            },
            Equirectangular: function () {

                scene.background = textureEquirec;

                sphereMaterial.envMap = textureEquirec;
                sphereMaterial.needsUpdate = true;

            },
            Refraction: false
        };

        var gui = new GUI();
        gui.add( params, 'Cube' );
        gui.add( params, 'Equirectangular' );
        gui.add( params, 'Refraction' ).onChange( function ( value ) {

            if ( value ) {

                textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
                textureCube.mapping = THREE.CubeRefractionMapping;

            } else {

                textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
                textureCube.mapping = THREE.CubeReflectionMapping;

            }

            sphereMaterial.needsUpdate = true;

        } );
        gui.open();

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function animate() {

        requestAnimationFrame( animate );

        render();

    }

    function render() {

        camera.lookAt( scene.position );
        renderer.render( scene, camera );

    }

  
  });
  


  

//const aframe_environment_component = require("aframe-environment-component");

