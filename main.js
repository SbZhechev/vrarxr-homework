vaxInit( {antialias:true, alpha:true} );
			
light.position.set(0, 0, 0);

const geometry = new THREE.BoxGeometry(200, 200, 200, 15, 15, 15);
const material = new THREE.MeshLambertMaterial( {color: 'green', side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const material2 = new THREE.MeshPhongMaterial({
    color:'white',
    wireframe:true,
    wireframeLinecap: 'butt',
});
const wireframe = new THREE.Mesh(geometry.clone(), material2);
scene.add(wireframe);

camera.position.set(0, 0, 0);
camera.lookAt(new THREE.Vector3( 0, 0, -1 ));

generateCones();

window.addEventListener( "deviceorientation", deviceOrientation, true);
			
function deviceOrientation( event )
{
    var alpha = event.alpha,
        gamma = event.gamma;

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

function generateCones() {
    const coneGeometry = new THREE.CylinderGeometry( 0, 2, 10, 32 );
    let coneMaterial;
    let cone;
    for(let i=0; i < 500; i++) {
        coneMaterial = new THREE.MeshLambertMaterial();
        coneMaterial.color = new THREE.Color(Math.random(),Math.random(),Math.random());
        cone = new THREE.Mesh( coneGeometry, coneMaterial );
        cone.position.set(THREE.Math.randFloat(-100,100), THREE.Math.randFloat(-90,90) , THREE.Math.randFloat(-100,100));
        scene.add( cone );
    }
}