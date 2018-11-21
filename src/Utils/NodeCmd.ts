import { exec } from 'shelljs';

export default class NodeCmdUtil {

  static executeCmd(cmd: string): string {
    const res = exec(cmd);
    if(res.stderr){
      throw new Error(res.stderr);
    }
    return res.stdout;
  }
  
}