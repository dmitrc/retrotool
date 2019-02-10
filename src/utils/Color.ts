export class Color {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor(r, g, b, a?) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a || "1";
  }

  toHex() {
      function h(c) {
          var hex = c.toString(16);
          return hex.length == 1 ? "0" + hex : hex;
      }
      return "#" + h(this.r) + h(this.g) + h(this.b);
  }

  toCss() {
      if (this.a != 1) {
          return `rgba(${this.r},${this.g},${this.b},${this.a})`;
      }
      else {
          return this.toHex();
      }
  }

  toTextCss() {
      // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
      if ((this.r * 0.299) + (this.g * 0.587) + (this.b * 0.114) > 186) {
          return "#000";
      }
      else {
          return "#fff";
      }
  }
}