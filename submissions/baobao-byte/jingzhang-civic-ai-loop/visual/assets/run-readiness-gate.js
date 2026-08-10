#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '../..');
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const sha = rel => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, rel))).digest('hex');
const assumptions = read('assumptions.json').assumptions;
const sources = read('sources.json').sources;
const constraints = read('geometry/constraints.geojson');
const protocols = read('visual/assets/pilot-protocols.json');
const byId = (xs, id) => xs.find(x => x.id === id) || {};
const resolved = id => String(byId(assumptions,id).status || '').startsWith('confirmed_');
const checks = [];
const add = (id, pass, observed, required, source) => checks.push({id, pass, observed, required, source});
add('R1_OFFICIAL_GEOMETRY', byId(sources,'BOUNDARY-SOURCE').source_type === 'official_geometry', byId(sources,'BOUNDARY-SOURCE').source_type || 'missing', 'official_geometry', 'sources.json#BOUNDARY-SOURCE');
add('R2_CONSTRAINT_INVENTORY', (constraints.features || []).length > 0, String((constraints.features || []).length) + ' features', 'non-empty professionally verified constraints', 'geometry/constraints.geojson');
add('R3_ACCOUNTABLE_OPERATOR', resolved('A-OPERATIONS-001'), byId(assumptions,'A-OPERATIONS-001').status || 'missing', 'confirmed accountable operator, maintenance, insurance and procurement roles', 'assumptions.json#A-OPERATIONS-001');
add('R4_DATA_GOVERNANCE', resolved('A-DATA-001'), byId(assumptions,'A-DATA-001').status || 'missing', 'confirmed legal basis, fields, retention and interfaces', 'assumptions.json#A-DATA-001');
add('R5_FIELD_BASELINE', resolved('A-PERFORMANCE-001'), byId(assumptions,'A-PERFORMANCE-001').status || 'missing', 'confirmed non-AI and worst-group field baseline', 'assumptions.json#A-PERFORMANCE-001');
add('R6_FIELD_AUTHORIZATION', protocols.status === 'field_authorized', protocols.status || 'missing', 'field_authorized', 'visual/assets/pilot-protocols.json#status');
const passed = checks.filter(x => x.pass).length;
const result = {
  evidence_version: '1.0',
  decision: passed === checks.length ? 'ELIGIBLE_FOR_G2_REVIEW' : 'BLOCKED_BEFORE_G2',
  summary: {passed, blocked: checks.length - passed, total: checks.length},
  claim_boundary: 'A deterministic package-readiness refusal test. It is not a legal, engineering or field authorization.',
  checks,
  inputs: {
    assumptions_sha256: sha('assumptions.json'),
    sources_sha256: sha('sources.json'),
    constraints_sha256: sha('geometry/constraints.geojson'),
    protocols_sha256: sha('visual/assets/pilot-protocols.json'),
    network_calls: 0,
    personal_records: 0
  }
};
const out = path.join(__dirname, 'readiness-gate-evidence.json');
fs.writeFileSync(out, JSON.stringify(result, null, 2) + String.fromCharCode(10));
console.log(result.decision + ': ' + result.summary.blocked + '/' + result.summary.total + ' prerequisites unresolved');
for (const c of checks) console.log((c.pass ? 'PASS' : 'BLOCK') + ' ' + c.id + ' — ' + c.observed);
if (result.decision !== 'BLOCKED_BEFORE_G2') process.exitCode = 2;
