const fs = require("fs");
const path = require("path");

// const mockBaseURL = "localhost:8080";
const mockBaseURL = "//note-server.hunger-valley.com"; //测试地址
const realBaseURL = "//note-server.hunger-valley.com"; //线上地址


exports.config = function ({isDev = true} = {isDev: true}) {
  let fileTxt = `
    module.exports={
      baseURL:'${isDev ? mockBaseURL : realBaseURL}'
    }
  `;
  fs.writeFileSync(path.join(__dirname, "../src/helpers/config-baseURL.js"), fileTxt);
};
