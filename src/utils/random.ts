import colors from 'colors';

export function random(content: string) {
  switch (Math.floor(Math.random() * 6)) {
    case 0:
      return colors.red(content);
    case 1:
      return colors.green(content);
    case 2:
      return colors.yellow(content);
    case 3:
      return colors.blue(content);
    case 4:
      return colors.magenta(content);
    case 5:
      return colors.cyan(content);
    default:
      break;
  }
  return content;
  
}
