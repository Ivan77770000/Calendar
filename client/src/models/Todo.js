import _ from "lodash";

import { getTimeRange } from "../common/function";

export default class TodoModel {
  id = 0;
  from = "";
  to = "";
  title = "";
  detail = "";

  static timeRange = {};

  constructor(id, from, to, title, detail) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.title = title;
    this.detail = detail;
  }

  static createOne() {
    const timeRange = getTimeRange();
    return new TodoModel(0, timeRange[0].value, timeRange[1].value, "", "");
  }

  static validtor(todo) {
    const timeRange = getTimeRange();
    const fromTime = _.find(timeRange, { value: todo.from });
    const toTime = _.find(timeRange, { value: todo.to });

    if (!todo.title) {
      return false;
    }

    if (fromTime.id > toTime.id) {
      return false;
    }

    if (!todo.detail) {
      return false;
    }

    return true;
  }
}
