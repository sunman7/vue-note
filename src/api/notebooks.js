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
          res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt ? 1 : -1);
          res.data.forEach(notebook => {
            notebook.createdAtFriendly = parseDate(notebook.createdAt);
            notebook.updatedAtFriendly = parseDate(notebook.updatedAt);
          });
          resolve(res);
        }
      ).catch(err => reject(err));
    });
  },
  updateNotebook(id, {title = ""} = {title: ""}) {
    return request(URL.UPDATE.replace(":id", id), "PATCH", {title});
  },
  deleteNotebook(id) {
    return request(URL.DELETE.replace(":id", id), "DELETE");
  },
  addNotebook({title = ""} = {title: ""}) {
    return new Promise(((resolve, reject) => {
        request(URL.ADD, "POST", {title})
          .then(res => {
            res.data.createdAtFriendly = parseDate(res.data.createdAt);
            res.data.updatedAtFriendly = parseDate(res.data.updatedAt);
            resolve(res);
          }).catch(err => {
          reject(err);
        });
      })
    );
  }
};
