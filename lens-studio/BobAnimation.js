// BobAnimation.js — bobs the parent SceneObject up and down

var BOB_HEIGHT  = 4.0;
var BOB_SPEED   = 1.8;
var SWAY_ANGLE  = 3.0;
var SQUISH      = 0.07;

var time = 0;
var basePosition = null;
var baseScale    = null;
var transform    = null;

print("[BobAnimation] loaded");

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
  // Lazy-init on first frame
  if (!transform) {
    var obj = script.getSceneObject();
    var parent = obj.getParent();
    var target = parent ? parent : obj;
    transform = target.getTransform();
    basePosition = transform.getLocalPosition();
    baseScale    = transform.getLocalScale();
    print("[BobAnimation] targeting: " + target.name + " baseY=" + basePosition.y);
  }

  var dt = eventData.getDeltaTime();
  time += dt;

  var bobPhase  = (time / BOB_SPEED) * Math.PI * 2;
  var bobOffset = Math.sin(bobPhase) * (BOB_HEIGHT * 0.5);

  transform.setLocalPosition(new vec3(
    basePosition.x,
    basePosition.y + bobOffset,
    basePosition.z
  ));

  var sinVal  = Math.sin(bobPhase);
  var scaleY  = 1.0 + sinVal * SQUISH;
  var scaleXZ = 1.0 - sinVal * (SQUISH * 0.5);

  transform.setLocalScale(new vec3(
    baseScale.x * scaleXZ,
    baseScale.y * scaleY,
    baseScale.z * scaleXZ
  ));

  var swayRad = Math.sin(bobPhase + Math.PI * 0.5) * SWAY_ANGLE * (Math.PI / 180);
  transform.setLocalRotation(quat.fromEulerAngles(0, 0, swayRad));
});
