import request from "../helpers/request";
import {parseDate} from "../helpers/util";

const URL = {
  GET: "/notebooks",
  ADD: "/notebooks",
  UPDATE: "/notebooks/:id",
  DELETE: "/notebooks/:id"
};

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(
        res => {
          console.log(res.data);
          res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt);
          res.data.forEach(notebook => notebook.friendlyTime = parseDate(notebook.createdAt));
          resolve(res);
        }
      );
    }).catch(err => reject(err));
  },
  updateNotebook(id, {title = ""} = {title: ""}) {
    return request(URL.UPDATE.replace(":id", id), "PATCH", {title});
  },
  deleteNotebook(id) {
    return request(URL.DELETE.replace(":id", id), "DELETE");
  },
  addNotebook({title = ""} = {title: ""}) {
    return request(URL.ADD, "POST", {title});
  }
};
