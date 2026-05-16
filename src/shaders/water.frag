uniform float uTime;
varying vec2 vUv;

#define tau 6.28318530718

float sin01(float x) {
  return (sin(x * tau) + 1.) / 2.;
}

float cos01(float x) {
  return (cos(x * tau) + 1.) / 2.;
}

vec2 rand01(vec2 p) {
  vec3 a = fract(p.xyx * vec3(123.5, 234.34, 345.65));
  a += dot(a, a + 34.45);
  return fract(vec2(a.x * a.y, a.y * a.z));
}

float distFn(vec2 from, vec2 to) {
  float x = length(from - to);
  return pow(x, 4.);
}

float voronoi(vec2 uv, float t, float seed, float size) {
  float minDist = 100.;
  float gridSize = size;
  vec2 cellUv = fract(uv * gridSize) - 0.5;
  vec2 cellCoord = floor(uv * gridSize);

  for (float x = -1.; x <= 1.; ++x) {
    for (float y = -1.; y <= 1.; ++y) {
      vec2 cellOffset = vec2(x, y);
      vec2 rand01Cell = rand01(cellOffset + cellCoord + seed);
      vec2 point = cellOffset + sin(rand01Cell * (t + 10.)) * .5;
      float dist = distFn(cellUv, point);
      minDist = min(minDist, dist);
    }
  }
  return minDist;
}

void main() {
  vec2 uv = vUv * 2. - 1.;
  float t = uTime * .35;

  float amplitude = .12;
  float turbulence = .5;
  uv.xy += sin01(uv.x * turbulence + t) * amplitude;
  uv.xy -= sin01(uv.y * turbulence + t) * amplitude;

  float v = 0.;
  float sizeDistortion = abs(uv.x) / 3.;
  v += voronoi(uv, t * 2., 0.5, 6.0 - sizeDistortion);
  v += voronoi(uv, t * 4., 0., 8.0 - sizeDistortion) / 2.;

  vec3 col = v * vec3(.55, .75, 1.);
  col += (1. - v) * vec3(.0, .3, .5);

  float alpha = v * 0.3;

  gl_FragColor = vec4(col, alpha);
}

