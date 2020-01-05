import { Command } from 'commander';
import { Cmd } from './type';
import ListCmd from './list';
import PostCmd from './post';
import GetCmd from './get';
import LoginCmd from './login';
import RemoveCmd from './rm';

const register = (program: Command) => (...cmds: Cmd[]) => {
  for (const cmd of cmds) {
    program
      .command(`${cmd.name} ${cmd.args ? cmd.args.join(' ') : ''}`)
      .description(cmd.description)
      .action(cmd.action);
  }

  return program;
};

export { register, Cmd, ListCmd, PostCmd, GetCmd, LoginCmd, RemoveCmd };
