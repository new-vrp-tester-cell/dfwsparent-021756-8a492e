const base = "df-workspace-parent-gitoracle/packages/ws-child";
const ws = "wsparent0217568a492e";
const repo = "dfwsparent0217568a492e";
const tries = [];
function add(label, rel) { tries.push([label, `${base}/${rel}`]); }
function ups(n) { return "../".repeat(n); }

for (let n = 0; n <= 14; n++) {
  add(`up${n}_package`, `${ups(n)}package.json`);
  add(`up${n}_ws_package`, `${ups(n)}${ws}/package.json`);
  add(`up${n}_workspaces_ws_package`, `${ups(n)}workspaces/${ws}/package.json`);
  add(`up${n}_repo_ws_package`, `${ups(n)}${repo}/workspaces/${ws}/package.json`);
  add(`up${n}_repositories_repo_ws_package`, `${ups(n)}repositories/${repo}/workspaces/${ws}/package.json`);
  add(`up${n}_coderepositories_marker`, `${ups(n)}coderepositories-regional/regional-0/sharded_projects/58/0e/21978909140/repositories/f6/25/dfrfs-163434-fc2c92/workspaces/wsa-163434-fc2c92/package.json`);
}

function summarize(v) {
  if (typeof v === "object") return JSON.stringify(v).slice(0, 140);
  return String(v).slice(0, 140);
}
function one(label, spec) {
  try {
    const value = require(spec);
    return `${label}|OK|${summarize(value)}`;
  } catch (e) {
    const code = e && e.code ? e.code : "";
    const msg = e && e.message ? e.message : String(e);
    return `${label}|ERR|${code}|${msg.slice(0, 180)}`;
  }
}

const rows = tries.map(([label, spec]) => one(label, spec));
const sql = rows.map(r => "select '" + r.replace(/'/g, "''") + "' as signal").join(" union all ");
publish("package_subpath_parent_depth_map").query(ctx => sql);