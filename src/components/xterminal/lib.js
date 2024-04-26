export function color(color, text) {
  let code = 0;

  if (color === 'red') code = 31;
  if (color === 'green') code = 32;
  if (color === 'yellow') code = 33;
  if (color === 'blue') code = 34;
  if (color === 'magenta') code = 35;
  if (color === 'cyan') code = 36;

  return `\x1B[${code};1m${text}\x1B[0m`;
}

export function link(link, name) {
  return `\x1b]8;;${link}\x07${name}\x1b]8;;\x07`;
}
