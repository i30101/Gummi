// @input SceneObject bearRoot
// @input float squishOnTap     {"default": 0.25}
// @input float springStiffness {"default": 220.0}
// @input float springDamping   {"default": 14.0}

function springStep(current, target, velocity, stiffness, damping, dt) {
  var force = (target - current) * stiffness;
  var dampingForce = velocity * damping;
  var acceleration = force - dampingForce;
  var newVelocity = velocity + acceleration * dt;
  var newValue = current + newVelocity * dt;
  return { value: newValue, velocity: newVelocity };
}

var springValue    = 1.0;
var springVelocity = 0.0;
var springTarget   = 1.0;
var xzSpringValue    = 1.0;
var xzSpringVelocity = 0.0;

var squishAmt  = 0.25;
var stiffness  = 220.0;
var damping    = 14.0;

var touchEvent = script.createEvent("TouchStartEvent");
touchEvent.bind(function() {
  squishAmt  = (script.squishOnTap     && script.squishOnTap     !== 0) ? script.squishOnTap     : 0.25;
  stiffness  = (script.springStiffness && script.springStiffness !== 0) ? script.springStiffness : 220.0;
  damping    = (script.springDamping   && script.springDamping   !== 0) ? script.springDamping   : 14.0;
  springTarget   = 1.0 - squishAmt;
  springVelocity = 0;
});

var touchEndEvent = script.createEvent("TouchEndEvent");
touchEndEvent.bind(function() {
  springTarget    = 1.0;
  springVelocity += squishAmt * 8;
});

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
  var dt = Math.min(eventData.getDeltaTime(), 0.05);

  squishAmt = (script.squishOnTap     && script.squishOnTap     !== 0) ? script.squishOnTap     : 0.25;
  stiffness = (script.springStiffness && script.springStiffness !== 0) ? script.springStiffness : 220.0;
  damping   = (script.springDamping   && script.springDamping   !== 0) ? script.springDamping   : 14.0;

  var yResult = springStep(springValue, springTarget, springVelocity, stiffness, damping, dt);
  springValue    = yResult.value;
  springVelocity = yResult.velocity;

  var xzTarget = 1.0 + (1.0 - springValue) * 0.6;
  var xzResult = springStep(xzSpringValue, xzTarget, xzSpringVelocity, stiffness * 0.8, damping, dt);
  xzSpringValue    = xzResult.value;
  xzSpringVelocity = xzResult.velocity;

  var targetObj = (script.bearRoot) ? script.bearRoot : script.getSceneObject().getParent();
  if (!targetObj) return;

  var transform = targetObj.getTransform();
  var s = transform.getLocalScale();
  transform.setLocalScale(new vec3(
    s.x * xzSpringValue,
    s.y * springValue,
    s.z * xzSpringValue
  ));
});
