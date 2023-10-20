import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  FreeCamera,
} from "@babylonjs/core";

var canvas: HTMLCanvasElement = document.getElementById(
  "renderCanvas"
) as HTMLCanvasElement;

var createScene = async (engine: Engine): Promise<Scene> => {
  var scene = new Scene(engine);
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  var sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  sphere.position.y = 1;

  const env = scene.createDefaultEnvironment();

  // XR support
  const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [env.ground],
  });

  return scene;
};

(async () => {
  try {
    var engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
    var scene = await createScene(engine);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  } catch (err) {
    console.error(err);
  }
})();
