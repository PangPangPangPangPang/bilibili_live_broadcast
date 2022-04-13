import 'colors';
export function randomColor(text: string) {
  const num = Math.floor(Math.random()*5);
  switch (num) {
    case 0:
      return text.red;
    case 1:
      return text.yellow;
    case 2:
      return text.green;
    case 3:
      return text.magenta;
    case 4:
      return text.cyan;
    default:
      return text.red;
  }
}
