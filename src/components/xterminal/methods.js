import {commands} from './commands.js';
import {color, link} from './lib.js';

export function userInfo() {
  return '# \x1B[1;32mUser\x1B[0m in \x1B[1;33m~/obydul.me\x1B[0m \r\n';
}

export function commandHelp(terminal) {
  const formatMessage = (command, description) => {
    let name = command.includes('gap') ? "" : command;
    return `  ${color('cyan', name.padEnd(10))} ${description}`;
  }

  terminal.writeln([
    'Welcome to obydul.me! Try some of the commands below:',
    '',
    ...Object.keys(commands).map(e => formatMessage(e, commands[e].description))
  ].join('\n\r'));
  terminal.prompt()
}

export function commandProjects(terminal) {
  let projects = {
    ef: {
      name: 'Electronic First',
      description: `An e-commerce platform for digital products. ${link('https://www.electronicfirst.com', '[live preview]')}`,
    },
    anyxel: {
      name: 'Anyxel',
      description: `A platform for ethical hackers and bug bounty hunters. ${link('https://anyxel.com', '[live preview]')}`,
    },
    anyxelSpider: {
      name: 'Anyxel Spider',
      description: `A free, open-source ethical hacking environment and vulnerability scanner. ${link('https://spider.anyxel.com', '[live preview]')}`,
    },
    shouts: {
      name: 'Shouts.dev',
      description: `A dev community and blogging platform. ${link('https://shouts.dev', '[live preview]')}`,
    },
    laraSkrill: {
      name: 'LaraSkrill',
      description: `A Laravel package for Skrill payment gateway. Used in 540+ projects. ${link('https://github.com/mdobydullah/laraskrill', '[repository]')}`,
    },
    realEmailVerify: {
      name: 'Real Email Verify',
      description: `Verify real email address by checking the domain name and MX record without sending email. ${link('https://github.com/mdobydullah/real-email-verify', '[repository]')}`,
    },
  }

  terminal.writeln("My remarkable projects:\r\n")
  for (let key in projects) {
    let project = projects[key];

    let message = `  ${color('blue', project.name.padEnd(20))} ${project.description}`;
    terminal.writeln(message)
  }
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
    let message = `  ${color('blue', name.padEnd(10))} ${url}`;
    terminal.writeln(message)
  })
  terminal.prompt()
}

export function commandAbout(terminal) {
  terminal.writeln(`${color('yellow', 'Md Obydullah')} is a software engineer, server administrator, ethical hacker and enthusiastic problem solver🚀  from Bangladesh.`)
  terminal.writeln(`He is currently working at \x1b]8;;https://www.electronicfirst.com\x07Electronic First\x1b]8;;\x07 as a ${color('green', 'Senior Software Engineer')}.`)
  terminal.writeln(`Follow him on ${link('https://x.com/0xObydul', 'X (Twitter)')} to know about his recent activities.`)
  terminal.prompt()
}

export function commandRepo(terminal) {
  terminal.writeln("You can find the source code of this project on GitHub. Pleas star the repository if you like it!🤩  If you have any suggestions or improvements, feel free to open an issue or a pull request. 🚀")
  terminal.writeln("")
  terminal.writeln("Repository: https://github.com/mdobydullah/obydul.me")
  terminal.prompt()
}
