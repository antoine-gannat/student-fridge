import * as chalk from 'chalk';

export default {
  log: function (...args) {
    console.log(args.join(" "));
  },
  info: function (...args) {
    console.log(chalk.blue(args.join(" ")));
  },
  error: function (...args) {
    console.error(chalk.red(args.join(" ")));
  },
  success: function (...args) {
    console.log(chalk.green(args.join(" ")));
  }
}