# Commands Run

Validation commands for packet repair are appended here as they are executed.

- `node /root/blueprint/scripts/check-mapper-selected-output.mjs selected-buildprint`
- `node -e "const fs=require('fs'); const files=['selected-buildprint/05-evidence/evidence-ledger.schema.json']; for (const f of files) JSON.parse(fs.readFileSync(f,'utf8')); const lines=fs.readFileSync('selected-buildprint/05-evidence/evidence-ledger.jsonl','utf8').split(/\\r?\\n/).filter(Boolean); lines.forEach((line,i)=>JSON.parse(line)); console.log('JSON validation passed:', files.length, 'json file(s),', lines.length, 'jsonl row(s)');"`
