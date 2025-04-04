import i from "jquery";
class n {
  static from(t) {
    return new r(t);
  }
}
class r {
  constructor(t) {
    this.data = {}, this.$element = i(t);
  }
  closest(t) {
    return this.$element = this.$element.closest(t), this;
  }
  find(t) {
    return this.$element = this.$element.find(t), this;
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
export {
  n as DOMRM,
  r as DOMRMBuilder
};
