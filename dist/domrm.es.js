import i from "jquery";
if (typeof i != "function")
  throw new Error("jQuery is not loaded or $ is not defined.");
const r = {
  from(s) {
    return new o(s);
  }
};
class o {
  constructor(t) {
    this.data = {}, this.$root = i(t), this.$element = this.$root;
  }
  find(t) {
    return this.$element = this.$root.find(t), this;
  }
  ascend(t) {
    return this.$root = this.$root.closest(t), this.$element = this.$root, this;
  }
  descend(t) {
    return this.$root = this.$root.find(t), this.$element = this.$root, this;
  }
  valAs(t) {
    return this.data[t] = this.$element.val(), this;
  }
  valAsNum(t) {
    const e = this.$element.val();
    return this.data[t] = typeof e == "string" ? parseFloat(e) : Number(e), this;
  }
  textAs(t) {
    return this.data[t] = this.$element.text().trim(), this;
  }
  attrAs(t) {
    return this.data[t] = this.$element.attr(t), this;
  }
  custom(t, e) {
    return this.data[t] = e(this.$element), this;
  }
  build() {
    return this.data;
  }
}
typeof window < "u" && (window.DOMRM = r);
export {
  o as DOMRMBuilder,
  r as default
};
