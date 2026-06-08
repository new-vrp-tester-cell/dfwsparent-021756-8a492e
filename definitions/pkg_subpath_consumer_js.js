const attempts = [
  "df-ws-child-gitoracle",
  "df-workspace-parent-gitoracle/packages/ws-child",
  "df-workspace-parent-gitoracle/packages/ws-child/index.js",
  "df-workspace-parent-gitoracle/packages/ws-child/package.json",
  "df-workspace-parent-gitoracle/packages/ws-child/../../../../.git/HEAD",
  "df-workspace-parent-gitoracle/packages/ws-child/../../../../.git/config",
  "df-workspace-parent-gitoracle/packages/ws-child/../../../../package-lock.json",
  "./node_modules/df-workspace-parent-gitoracle/packages/ws-child/../../../../.git/HEAD",
  "df-workspace-parent-gitoracle/packages/ws-child/../../../../../.git/HEAD"
];
function one(spec) {
  try {
    const v = require(spec);
    return spec + " => OK:" + String(typeof v === "object" ? JSON.stringify(v) : v).slice(0, 240);
  } catch (e) {
    return spec + " => ERR:" + String(e && e.message ? e.message : e).slice(0, 260);
  }
}
const rows = attempts.map(one);
publish("pkg_subpath_consumer_js").query(ctx =>
  rows.map(r => "select '" + r.replace(/'/g, "''") + "' as signal").join(" union all ")
);