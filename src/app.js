var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, Vector3, HemisphericLight, MeshBuilder, FreeCamera, } from "@babylonjs/core";
var canvas = document.getElementById("renderCanvas");
var createScene = (engine) => __awaiter(void 0, void 0, void 0, function* () {
    var scene = new Scene(engine);
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    var sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;
    const env = scene.createDefaultEnvironment();
    const xr = yield scene.createDefaultXRExperienceAsync({
        floorMeshes: [env.ground],
    });
    return scene;
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var engine = new Engine(canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true,
        });
        var scene = yield createScene(engine);
        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }
    catch (err) {
        console.error(err);
    }
}))();
