const attempts = [
  "df-ws-child-gitoracle",
  "df-workspace-parent-gitoracle/packages/ws-child",
  "./node_modules/df-workspace-parent-gitoracle/packages/ws-child",
  "df-workspace-parent-gitoracle/packages/ws-child/package.json",
  "./node_modules/df-workspace-parent-gitoracle/packages/ws-child/package.json",
  "df-workspace-parent-gitoracle/packages/ws-child/../../../../.git/HEAD",
  "./node_modules/df-workspace-parent-gitoracle/packages/ws-child/../../../../.git/HEAD"
];
function one(spec) {
  try {
    const v = require(spec);
    return spec + " => OK:" + String(typeof v === "object" ? JSON.stringify(v) : v).slice(0, 160);
  } catch (e) {
    return spec + " => ERR:" + String(e && e.message ? e.message : e).slice(0, 220);
  }
}
const rows = attempts.map(one);
const sql = rows.map(r => "select '" + r.replace(/'/g, "''") + "' as signal").join(" union all ");
publish("remote_parent_direct_require_followup").query(ctx => sql);