import {commands} from './commands.js';
import {userInfo} from "@/components/xterminal/methods";

export function callWithDelay(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

export async function startServer(terminal) {
  const messages = [
    {text: 'Welcome\r\n', delay: 0},
    {text: 'Starting the server...\r\n', delay: 200},
    {text: 'Try running `help` command\r\n\r\n', delay: 700},
    {text: userInfo(), delay: 100},
  ];

  for (const message of messages) {
    await writeWithDelay(terminal, message.text, message.delay);
  }

  terminal.prompt();
  terminal.focus();
}

async function writeWithDelay(terminal, message, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      terminal.write(message);
      resolve();
    }, delay);
  });
}


export function runCommand(terminal, text) {
  const command = text.trim().split(' ')[0];

  if (command.length > 0) {
    terminal.writeln('');
    if (command in commands) {
      commands[command].f(terminal);
      return;
    }
    terminal.writeln(`${command}: command not found`);
    terminal.prompt()
  } else {
    terminal.prompt()
  }
}
