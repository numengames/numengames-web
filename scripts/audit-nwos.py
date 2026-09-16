#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games
# SPDX-License-Identifier: AGPL-3.0-only
"""Audita numengames-web contra STD-015 de NWOS. Escribe /tmp/audit.json."""
import json, os, re, subprocess

REPO = "/var/home/uruk/arkitecktonia-home/repos/numengames-web"
os.chdir(REPO)

def sh(cmd):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return r.stdout.strip()

def gh(path, jq=None):
    c = f"gh api {path}" + (f" --jq '{jq}'" if jq else "")
    r = subprocess.run(c, shell=True, capture_output=True, text=True)
    return r.stdout.strip() if r.returncode == 0 else None

checks = []
def add(rid, area, texto, estado, evidencia, quien):
    checks.append(dict(id=rid, area=area, texto=texto, estado=estado,
                       evidencia=evidencia, quien=quien))

# --- ficheros exigidos ---
FILES = [
    ("SEC-010", "Seguridad", "CODEOWNERS cubre LICENSE*, .github/workflows/", ".github/CODEOWNERS", "agente"),
    ("SEC-009", "Seguridad", "SECURITY.md con política de divulgación", "SECURITY.md", "agente"),
    ("OSS-001", "Comunidad", "CONTRIBUTING.md que un extraño pueda seguir", "CONTRIBUTING.md", "agente"),
    ("OSS-002", "Comunidad", "Código de conducta presente", "CODE_OF_CONDUCT.md", "agente"),
    ("TRC-002", "Trazabilidad", "Plantilla de PR con Definition of Done", ".github/pull_request_template.md", "agente"),
    ("DEV-003", "Ergonomía", ".editorconfig comprometido", ".editorconfig", "agente"),
    ("ARC-003", "Arquitectura", "REUSE 3.3: REUSE.toml presente", "REUSE.toml", "agente"),
    ("TRC-004", "Trazabilidad", "CHANGELOG.md o releases", "CHANGELOG.md", "agente"),
    ("DEV-001", "Ergonomía", ".env.example exhaustivo", ".env.example", "agente"),
    ("TRC-005", "Trazabilidad", "Roadmap o TODO como fichero", "TODO.md", "agente"),
]
for rid, area, texto, f, quien in FILES:
    ok = os.path.exists(f)
    add(rid, area, texto, "cumple" if ok else "incumple",
        f"{f} {'presente' if ok else 'AUSENTE'}", quien)

# --- repo metadata ---
meta = json.loads(gh("repos/numengames/numengames-web") or "{}")
topics = meta.get("topics", [])
home = meta.get("homepage") or ""
add("TRC-001", "Trazabilidad", 'About completo: descripción, web, topics',
    "cumple" if (meta.get("description") and home and topics) else "incumple",
    f"desc={'sí' if meta.get('description') else 'no'} · web={home or 'vacía'} · topics={len(topics)}",
    "oraculo")

# --- ruleset ---
rs = json.loads(gh("repos/numengames/numengames-web/rulesets") or "[]")
rules = []
if rs:
    full = json.loads(gh(f"repos/numengames/numengames-web/rulesets/{rs[0]['id']}") or "{}")
    rules = [r["type"] for r in full.get("rules", [])]
    pr_rule = next((r for r in full.get("rules", []) if r["type"] == "pull_request"), None)
else:
    pr_rule = None

tiene_pr = "pull_request" in rules
tiene_checks = "required_status_checks" in rules
tiene_lineal = "required_linear_history" in rules
tiene_noff = "non_fast_forward" in rules

add("ARC-002", "Arquitectura", "Protección de main: PR y checks requeridos, sin force push",
    "cumple" if (tiene_pr and tiene_checks and tiene_noff) else "parcial",
    f"PR={'sí' if tiene_pr else 'no'} · checks_requeridos={'sí' if tiene_checks else 'NO'} · lineal={'sí' if tiene_lineal else 'no'} · no_force={'sí' if tiene_noff else 'no'}",
    "oraculo")

n_aprob = pr_rule["parameters"].get("required_approving_review_count") if pr_rule else 0
add("DEV-007", "Ergonomía", "Al menos una aprobación antes de main",
    "cumple" if n_aprob >= 1 else "incumple",
    f"aprobaciones requeridas = {n_aprob}", "oraculo")

# strict = obliga a estar al día con main
strict = False
if tiene_checks:
    sc = next(r for r in full["rules"] if r["type"] == "required_status_checks")
    strict = sc["parameters"].get("strict_required_status_checks_policy", False)
add("ARC-002b", "Arquitectura", "La rama debe estar al día con main antes de fusionar",
    "cumple" if strict else "incumple",
    "strict_required_status_checks_policy = " + ("true" if strict else "AUSENTE (no hay regla de checks)"),
    "oraculo")

# --- acciones ancladas por SHA (SEC-007) ---
unpinned, pinned = [], []
for wf in sh("ls .github/workflows/*.yml 2>/dev/null").split("\n"):
    if not wf: continue
    for m in re.finditer(r"uses:\s*([^\s@]+)@([^\s#]+)", open(wf).read()):
        action, ref = m.group(1), m.group(2)
        if action.startswith("./"): continue
        (pinned if re.fullmatch(r"[0-9a-f]{40}", ref) else unpinned).append(f"{action}@{ref}")
add("SEC-007", "Seguridad", "Acciones de terceros ancladas por SHA de commit",
    "cumple" if not unpinned else "incumple",
    f"{len(pinned)} ancladas" + (f" · SIN anclar: {', '.join(unpinned[:3])}" if unpinned else ""),
    "agente")

# --- permisos de workflow read-only por defecto (SEC-008) ---
wf_sin_perms = []
for wf in sh("ls .github/workflows/*.yml 2>/dev/null").split("\n"):
    if wf and "permissions:" not in open(wf).read():
        wf_sin_perms.append(os.path.basename(wf))
add("SEC-008", "Seguridad", "Token de workflow read-only por defecto",
    "cumple" if not wf_sin_perms else "incumple",
    "todos declaran permissions" if not wf_sin_perms else f"sin permissions: {', '.join(wf_sin_perms)}",
    "agente")

# --- CI: type-check en el pipeline (ARC-001) ---
ci = open(".github/workflows/ci.yml").read() if os.path.exists(".github/workflows/ci.yml") else ""
tiene_tc = "astro check" in ci or "type-check" in ci or "tsc" in ci
add("ARC-001", "Arquitectura", "Pipeline idéntico: type-check → lint → test → build",
    "cumple" if tiene_tc else "incumple",
    "type-check en CI" if tiene_tc else "CI NO ejecuta astro check: los errores de tipos no se detectan",
    "agente")

# --- licencia (ARC-003 / STD-010) ---
pkg = json.loads(open("package.json").read())
lic_pkg = pkg.get("license")
lic_file = sh("head -3 LICENSE 2>/dev/null | tr '\\n' ' '")[:60]
spdx = sh("grep -rl 'SPDX-License-Identifier' src/ worker/ 2>/dev/null | head -1")
spdx_val = sh(f"grep -oh 'SPDX-License-Identifier: .*' {spdx} 2>/dev/null | head -1") if spdx else ""
coherente = bool(lic_pkg) and lic_pkg in spdx_val
add("ARC-003b", "Arquitectura", "Licencia coherente en LICENSE, package.json y SPDX",
    "cumple" if coherente else "incumple",
    f"LICENSE={lic_file.strip() or '?'} · package.json={lic_pkg or 'SIN CAMPO'} · ficheros={spdx_val.replace('SPDX-License-Identifier: ','') or '?'}",
    "oraculo")

# --- despliegue ---
runs = json.loads(sh("gh run list --workflow=deploy.yml --limit 1 --json conclusion,headSha,databaseId") or "[]")
ultimo = runs[0] if runs else {}
add("SRE-005", "Operaciones", "Despliegue reproducible desde un clon limpio",
    "incumple" if ultimo.get("conclusion") != "success" else "cumple",
    f"último deploy de {ultimo.get('headSha','?')[:7]}: {ultimo.get('conclusion','?')} — faltan secretos",
    "oraculo")
add("SEC-004", "Seguridad", "Secretos en GitHub Environments, no en el repo",
    "incumple", "CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID sin verificar",
    "oraculo")

# --- health check (SRE-002) ---
add("SRE-002", "Operaciones", "Endpoint de health-check en el servicio",
    "cumple" if os.path.exists("src/pages/version.json.ts") else "incumple",
    "/version.json construido" if os.path.exists("src/pages/version.json.ts") else "ausente",
    "agente")

json.dump(checks, open("/tmp/audit.json", "w"), ensure_ascii=False, indent=1)

n = len(checks)
c = sum(1 for x in checks if x["estado"] == "cumple")
p = sum(1 for x in checks if x["estado"] == "parcial")
i = sum(1 for x in checks if x["estado"] == "incumple")
mio = sum(1 for x in checks if x["estado"] != "cumple" and x["quien"] == "agente")
tuyo = sum(1 for x in checks if x["estado"] != "cumple" and x["quien"] == "oraculo")
print(f"  reglas evaluadas : {n}")
print(f"  cumple           : {c}")
print(f"  parcial          : {p}")
print(f"  incumple         : {i}")
print(f"  ---")
print(f"  arreglo yo       : {mio}")
print(f"  necesitas admin  : {tuyo}")
