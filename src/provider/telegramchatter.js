/**
 * Created by fabrizio on 30/03/16.
 */

class TelegramChatter {

  constructor() {
    this.sessions = {};
    this.commands = {};
  }

  processRequest(res) {
    if (res.result) {
      let lastupdateId = 0;
      let self = this;
      
      res.result.forEach((value) => {
        lastupdateId = value.update_id + 1;

        self.sessions[Symbol(value.message.chat.id)] = value.message.chat;

        const readText = value.message.text.toLowerCase();
        const cli = readText.startsWith('/') ? readText.split(' ') : [];
        if(cli.length > 0) {
          if (this.commands.hasOwnProperty(cli[0])) {
            let cmd = this.commands[cli[0]];
            if (cmd) {
              cmd.execute(value.message.chat, cli.slice(1));
            }
          }
        }
      });

      return lastupdateId;
    }
  }

  addCommand(key, cmd) {
    this.commands[key.toLowerCase()] = cmd;
  }

}

module.exports = TelegramChatter;
