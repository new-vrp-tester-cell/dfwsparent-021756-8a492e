const variant = "root_file_dot";
const specsByVariant = {
  baseline: [
    "dfv-child-baseline",
    "dfv-parent-baseline/packages/ws-child",
    "dfv-parent-baseline/packages/ws-child/package.json",
    "dfv-parent-baseline/packages/ws-child/../../../../.git/HEAD",
    "dfv-parent-baseline/packages/ws-child/../../../../workflow_settings.yaml",
    "dfv-parent-baseline/../../../workflow_settings.yaml"
  ],
  scoped_child: [
    "@dfv/scope-child",
    "dfv-parent-scoped/packages/scope-child",
    "dfv-parent-scoped/packages/scope-child/package.json",
    "dfv-parent-scoped/packages/scope-child/../../../../.git/HEAD",
    "@dfv/scope-child/../../dfv-parent-scoped/packages/scope-child/package.json"
  ],
  file_dot_alias: [
    "dfv-dot-alias",
    "dfv-parent-dot",
    "dfv-parent-dot/../../package.json",
    "dfv-parent-dot/../../.git/HEAD"
  ],
  file_parent: [
    "dfv-parent-up-link",
    "dfv-parent-up/../../package.json",
    "dfv-parent-up/../../.git/HEAD"
  ],
  file_grandparent: [
    "dfv-grand-up-link",
    "dfv-parent-grandup/../../package.json",
    "dfv-parent-grandup/../../.git/HEAD"
  ],
  workspace_glob_dotdot: [
    "dfv-glob-child",
    "dfv-packages-dir",
    "dfv-parent-globdotdot/packages",
    "dfv-parent-globdotdot/packages/../../.git/HEAD"
  ],
  root_file_dot: [
    "dfv-root-dot",
    "dfv-root-dot/package.json",
    "dfv-root-dot/.git/HEAD"
  ],
  root_file_parent: [
    "dfv-root-parent",
    "dfv-root-parent/package.json",
    "dfv-root-parent/.git/HEAD"
  ],
  lockfile_link_dotdot: [
    "dfv-lock-out",
    "dfv-lock-out/package.json",
    "dfv-lock-out/.git/HEAD"
  ],
  lockfile_link_git: [
    "dfv-lock-git",
    "dfv-lock-git/HEAD"
  ]
};
const specs = specsByVariant[variant] || [];
function one(spec) {
  try {
    const v = require(spec);
    return spec + " => OK:" + String(typeof v === "object" ? JSON.stringify(v) : v).slice(0, 220);
  } catch (e) {
    return spec + " => ERR:" + String(e && e.message ? e.message : e).slice(0, 260);
  }
}
const rows = specs.map(one);
const sql = rows.length ? rows.map(r => "select '" + r.replace(/'/g, "''") + "' as signal").join(" union all ") : "select 'no specs' as signal";
publish("variant_" + variant.replace(/[^A-Za-z0-9_]/g, "_")).query(ctx => sql);
