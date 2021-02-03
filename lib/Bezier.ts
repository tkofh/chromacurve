export default class Bezier {
  // var DEFAULT_DURATION = 400;//ms
  private readonly cx: number
  private readonly bx: number
  private readonly ax: number

  private readonly cy: number
  private readonly by: number
  private readonly ay: number

  constructor(p1x: number, p1y: number, p2x: number, p2y: number) {
    this.cx = 3.0 * p1x
    this.bx = 3.0 * (p2x - p1x) - this.cx
    this.ax = 1.0 - this.cx - this.bx

    this.cy = 3.0 * p1y
    this.by = 3.0 * (p2y - p1y) - this.cy
    this.ay = 1.0 - this.cy - this.by
  }

  solve(x: number, epsilon: number = 0.0000125) {
    return this.sampleCurveY(this.solveCurveX(x, epsilon))
  }

  private sampleCurveX(t: number) {
    return ((this.ax * t + this.bx) * t + this.cx) * t
  }

  private sampleCurveY(t: number) {
    return ((this.ay * t + this.by) * t + this.cy) * t
  }

  private sampleCurveDerivativeX(t: number) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx
  }

  private solveCurveX(x: number, epsilon: number) {
    let t0: number, t1: number, t2: number, x2: number, d2: number, i: number

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++) {
      x2 = this.sampleCurveX(t2) - x
      if (Math.abs(x2) < epsilon) {
        return t2
      }
      d2 = this.sampleCurveDerivativeX(t2)
      if (Math.abs(d2) < 1e-6) {
        break
      }
      t2 = t2 - x2 / d2
    }

    // Fall back to the bisection method for reliability.
    t0 = 0.0
    t1 = 1.0
    t2 = x

    if (t2 < t0) {
      return t0
    }
    if (t2 > t1) {
      return t1
    }

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2)
      if (Math.abs(x2 - x) < epsilon) {
        return t2
      }
      if (x > x2) {
        t0 = t2
      } else {
        t1 = t2
      }
      t2 = (t1 - t0) * 0.5 + t0
    }

    // Failure.
    return t2
  }
}
