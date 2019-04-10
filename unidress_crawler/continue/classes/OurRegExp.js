class OurRegExp extends RegExp {
  [Symbol.split](str, limit) {
    var result = RegExp.prototype[Symbol.split].call(this, str, limit);
    return result.map(x => "[" + x + "]");
  }
}
