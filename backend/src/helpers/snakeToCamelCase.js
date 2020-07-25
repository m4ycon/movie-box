export default function snakeToCamelCase(str) {
  const nOf_ = str.match(/_/g).length;
  for (let i = 0; i < nOf_; i++) {
    str = str.replace(
      /([A-Za-z]+)_([A-Za-z]{1})(.*)/,
      (str, $1, $2, $3) => $1 + $2.toUpperCase() + $3
    );
  }
  return str;
}
