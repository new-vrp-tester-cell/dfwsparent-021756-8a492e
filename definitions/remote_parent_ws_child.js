let child;
try {
  child = require("df-ws-child-gitoracle");
} catch (e) {
  child = "ERR:" + (e && e.message ? e.message : String(e)).slice(0, 180);
}
publish("remote_parent_ws_child").query(ctx => `select '${child.replace(/'/g, "''")}' as child_signal`);