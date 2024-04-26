import {commandAbout, commandHelp, commandRepo, commandSocial, userInfo} from './methods.js';

export let commands = {
  help: {
    f: (terminal) => commandHelp(terminal),
    description: 'Print this help message',
  },
  ls: {
    f: (terminal) => commandHelp(terminal),
    description: 'Print available commands',
  },
  "ctrl+c": {
    f: (terminal) => {
      terminal.write('^C');
      terminal.prompt()
    },
    description: 'Cancel the current command'
  },
  clear: {
    f: (terminal) => {
      terminal.reset()
      terminal.write(userInfo())
      terminal.prompt()
    },
    description: 'Clear the terminal'
  },
  gap1: {
    description: ' ',
  },
  projects: {
    f: (terminal) => commandSocial(terminal),
    description: 'Projects I have worked on',
  },
  social: {
    f: (terminal) => commandSocial(terminal),
    description: 'Social media links',
  },
  about: {
    f: (terminal) => commandAbout(terminal),
    description: 'About Md Obydullah',
  },
  gap2: {
    description: ' ',
  },
  repo: {
    f: (terminal) => commandRepo(terminal),
    description: 'Star and fork this repo',
  },
};
