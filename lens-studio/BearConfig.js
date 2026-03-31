// BearConfig.js — self-contained bear color config
// No @input dependencies, finds the mesh itself

print("[BearConfig] script loaded");

function rgbToHsv(r, g, b) {
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var delta = max - min;
  var h = 0, s = max === 0 ? 0 : delta / max, v = max;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = h * 60;
    if (h < 0) h += 360;
  }
  return { h: h, s: s, v: v };
}

function hsvToRgb(h, s, v) {
  if (s === 0) return { r: v, g: v, b: v };
  h = h % 360;
  if (h < 0) h += 360;
  var sector = Math.floor(h / 60);
  var f = h / 60 - sector;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  switch (sector) {
    case 0: return { r: v, g: t, b: p };
    case 1: return { r: q, g: v, b: p };
    case 2: return { r: p, g: v, b: t };
    case 3: return { r: p, g: q, b: v };
    case 4: return { r: t, g: p, b: v };
    default: return { r: v, g: p, b: q };
  }
}

function findMeshInChildren(obj) {
  for (var i = 0; i < obj.getChildrenCount(); i++) {
    var child = obj.getChild(i);
    var rmv = child.getComponent("Component.RenderMeshVisual");
    if (rmv) return { obj: child, rmv: rmv };
    var deeper = findMeshInChildren(child);
    if (deeper) return deeper;
  }
  return null;
}

var updateEvent = script.createEvent("UpdateEvent");
var applied = false;
var frameCount = 0;

updateEvent.bind(function() {
  if (applied) return;
  frameCount++;
  // Wait a few frames for launchParams to be available
  if (frameCount < 10) return;
  applied = true;

  // Try to read hue from launchParams
  var hue = 0;
  try {
    if (global.launchParams) {
      var hueStr = global.launchParams.getString("bear_hue");
      print("[BearConfig] launchParams bear_hue raw: " + hueStr);
      hue = parseFloat(hueStr) || 0;
    } else {
      print("[BearConfig] no global.launchParams");
    }
  } catch(e) {
    print("[BearConfig] launchParams error: " + e);
  }

  print("[BearConfig] applying hue=" + hue);

  if (hue === 0) {
    print("[BearConfig] hue is 0, no color shift needed");
    return;
  }

  // Find the bear mesh — walk up to GummyBear root then search children
  var parent = script.getSceneObject().getParent();
  var target = parent ? parent : script.getSceneObject();
  print("[BearConfig] searching for mesh in: " + target.name);

  var result = findMeshInChildren(target);
  if (!result) {
    print("[BearConfig] ERROR: no RenderMeshVisual found");
    return;
  }

  print("[BearConfig] found mesh: " + result.obj.name);
  var matCount = result.rmv.getMaterialsCount();
  print("[BearConfig] material count: " + matCount);

  // Shift hue on all materials
  var baseR = 0.978, baseG = 0.0, baseB = 0.0;
  var hsv = rgbToHsv(baseR, baseG, baseB);
  hsv.h = (hsv.h + hue) % 360;
  if (hsv.h < 0) hsv.h += 360;
  var rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);

  for (var i = 0; i < matCount; i++) {
    var mat = result.rmv.getMaterial(i);
    try {
      // Try mainPass.baseColor (LS5 PBR)
      mat.mainPass.baseColor = new vec4(rgb.r, rgb.g, rgb.b, 1.0);
      print("[BearConfig] set mainPass.baseColor on material " + i);
    } catch(e1) {
      try {
        // Try direct baseColor
        mat.baseColor = new vec4(rgb.r, rgb.g, rgb.b, 1.0);
        print("[BearConfig] set baseColor on material " + i);
      } catch(e2) {
        print("[BearConfig] could not set color on material " + i + ": " + e2);
      }
    }
  }

  print("[BearConfig] done — color set to hue " + hue);
});
