vaxInit();

let cubeTexture = new THREE.CubeTextureLoader().load( ['berzelii/posx.jpg', 'berzelii/negx.jpg', 'berzelii/posy.jpg', 'berzelii/negy.jpg', 'berzelii/posz.jpg', 'berzelii/negz.jpg' ] );
cubeTexture.mapping = THREE.CubeRefractionMapping;

scene.background = cubeTexture;

window.addEventListener( "deviceorientation", deviceOrientation, true);
    
function deviceOrientation( event )
{
    let alpha = event.alpha;
    let gamma = event.gamma;

    if( alpha === null ) return;

    if( gamma>=0 )
        gamma = 90-gamma;
    else
    {
        alpha = alpha+180;
        gamma = -90-gamma;
    }
                        
    alpha = THREE.Math.degToRad( alpha );
    gamma = THREE.Math.degToRad( gamma );

    camera.rotation.set( gamma, alpha, 0, 'YZX' );
}

let crystals = [];

function generateCrystals() {
    let crystalGeometry = new THREE.IcosahedronGeometry( 10, 0 );

    let crystalMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: cubeTexture, refractionRatio: 0.97, transparent: true });

    let crystal;

    for(let i=0; i < 35; i++) {
        crystal = new THREE.Mesh( crystalGeometry, crystalMaterial );
        crystal.position.set(THREE.Math.randFloat(-500,300), THREE.Math.randFloat(10, 90) , THREE.Math.randFloat(-100, 300));
        crystals.push(crystal);
        scene.add( crystal );
    }
}

generateCrystals();

function animate()
{
    crystals.map((crystal) => crystal.rotation.y = t/3);
}