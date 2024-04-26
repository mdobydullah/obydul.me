import {commandAbout, commandHelp, commandSocial, userInfo} from './methods.js';

export let commands = {
  help: {
    f: (terminal) => commandHelp(terminal),
    description: 'Print this help message',
  },
  ls: {
    f: (terminal) => commandHelp(terminal),
    description: 'Print available commands',
  },
  // ls: {
  //   f: (terminal) => {
  //     Object.keys(commands).forEach(key => {
  //       terminal.writeln(key)
  //     });
  //     terminal.prompt()
  //   },
  //   description: 'Print available commands'
  // },
  clear: {
    f: (terminal) => {
      terminal.reset()
      terminal.write(userInfo())
      terminal.prompt()
    },
    description: 'Clear the terminal'
  },
  '': {
    description: ' ',
  },
  social: {
    f: (terminal) => commandSocial(terminal),
    description: 'Social media links',
  },
  about: {
    f: (terminal) => commandAbout(terminal),
    description: 'About Md Obydullah',
  },
};
