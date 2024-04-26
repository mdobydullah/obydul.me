import {commands} from './commands.js';

export function color(color, text) {
  let code = 0;

  if (color === 'red') code = 31;
  if (color === 'green') code = 32;
  if (color === 'yellow') code = 33;
  if (color === 'blue') code = 34;

  return `\x1B[${code};1m${text}\x1B[0m`;
}

export function userInfo() {
  return '# \x1B[1;32mUser\x1B[0m in \x1B[1;33m~/obydul.me\x1B[0m \r\n';
}

export function commandHelp(terminal) {
  const padding = 10;

  function formatMessage(name, description) {
    const maxLength = terminal.cols - padding - 3;
    let remaining = description;
    const d = [];
    while (remaining.length > 0) {
      // Trim any spaces left over from the previous line
      remaining = remaining.trimStart();
      // Check if the remaining text fits
      if (remaining.length < maxLength) {
        d.push(remaining);
        remaining = '';
      } else {
        let splitIndex = -1;
        // Check if the remaining line wraps already
        if (remaining[maxLength] === ' ') {
          splitIndex = maxLength;
        } else {
          // Find the last space to use as the split index
          for (let i = maxLength - 1; i >= 0; i--) {
            if (remaining[i] === ' ') {
              splitIndex = i;
              break;
            }
          }
        }
        d.push(remaining.substring(0, splitIndex));
        remaining = remaining.substring(splitIndex);
      }
    }

    // if name contains string "gap", then replace with space
    if (name.includes('gap')) {
      name = "";
    }

    const message = (
      `  \x1b[36;1m${name.padEnd(padding)}\x1b[0m ${d[0]}` +
      d.slice(1).map(e => `\r\n  ${' '.repeat(padding)} ${e}`)
    );
    return message;
  }

  terminal.writeln([
    'Welcome to obydul.me! Try some of the commands below.',
    '',
    ...Object.keys(commands).map(e => formatMessage(e, commands[e].description))
  ].join('\n\r'));
  terminal.prompt()
}

export function commandSocial(terminal) {
  let socialLinks = {
    'Twitter': 'https://x.com/0xObydul',
    'GitHub': 'https://github.com/mdobydullah',
    'LinkedIn': 'https://www.linkedin.com/in/obydul',
    'YouTube': 'https://www.youtube.com/@AnyxelBn',
    'ADPList': 'https://adplist.org/mentors/md-obydullah',
    'More': 'https://bio.link/obydul',
  };

  terminal.writeln("You can follow me on social media.\r\n")
  Object.entries(socialLinks).forEach(([name, url]) => {
    terminal.writeln(`• ${name}: \x1b]8;;${url}\x07${url}\x1b]8;;\x07`)
  })

  terminal.prompt()
}

export function commandAbout(terminal) {
  terminal.writeln(`${color('yellow', 'Md Obydullah')} is a software engineer, server administrator, ethical hacker and enthusiastic problem solver🚀  from Bangladesh.`)
  terminal.writeln(`He is currently working at \x1b]8;;https://www.electronicfirst.com\x07Electronic First\x1b]8;;\x07 as a ${color('green', 'Senior Software Engineer')}.`)
  terminal.writeln("Follow him on \x1b]8;;https://x.com/0xObydul\x07X (Twitter)\x1b]8;;\x07 to know about his recent activities.")
  terminal.prompt()
}

export function commandRepo(terminal) {
  terminal.writeln("You can find the source code of this project on \x1b]8;;https://github.com/mdobydullah/obydul.me\x07GitHub\x1b]8;;\x07.")
  terminal.writeln("Pleas star the repository if you like it! 🤩")
  terminal.writeln("If you have any suggestions or improvements, feel free to open an issue or a pull request. 🚀")
  terminal.prompt()
}
