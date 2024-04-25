'use client'
import React, {useEffect} from 'react';
import {Terminal} from "@xterm/xterm";
import {FitAddon} from "xterm-addon-fit";

import {callWithDelay, runCommand, startServer} from './terminal';

export default function XTerminal() {
  let terminalRef = React.useRef(null);

  useEffect(() => {
    const terminal = new Terminal({
      rows: 30,
      screenKeys: true,
      cursorBlink: true,
      macOptionIsMeta: true,
      fontSize: 14,
      fontFamily: 'Ubuntu Mono, courier-new, courier, monospace'
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    function fitToScreen() {
      fitAddon.fit();
      // console.log(terminal.cols, terminal.rows);
    }

    window.onresize = callWithDelay(fitToScreen, 50);
    terminal.open(terminalRef.current);
    terminal.options.scrollback = 5000;

    terminal.prompt = function () {
      terminal.write("\r\n" + "$ ");
    };

    startServer(terminal);
    let command = '';

    terminal.onData(e => {
      switch (e) {
        case '\u0003': // Ctrl+C
          terminal.write('^C');
          terminal.prompt()
          break;
        case '\r': // Enter
          runCommand(terminal, command);
          command = '';
          break;
        case '\u007F': // Backspace (DEL)
          // Do not delete the prompt
          if (terminal._core.buffer.x > 2) {
            terminal.write('\b \b');
            if (command.length > 0) {
              command = command.substr(0, command.length - 1);
            }
          }
          break;
        default: // Print all other characters for demo
          if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
            command += e;
            terminal.write(e);
          }
      }
    });

    terminal.attachCustomKeyEventHandler((event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.code === "KeyV" &&
        event.type === "keydown"
      ) {
        navigator.clipboard.readText().then((clipText) => {
          terminal.write(clipText)
        });
        event.preventDefault();
      }
    });

  }, [terminalRef]);

  return (
    <div className="container mt-4">
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="buttons">
            <div className="button red"></div>
            <div className="button yellow"></div>
            <div className="button green"></div>
          </div>
        </div>
        <div className="inner">
          <div ref={terminalRef}></div>
        </div>
      </div>
    </div>
  )

}
