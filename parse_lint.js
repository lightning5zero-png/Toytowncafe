const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lint_utf8.json', 'utf8'));
const out = data.filter(d => d.errorCount > 0 || d.warningCount > 0).map(d => {
    return d.filePath + '\n' + d.messages.map(m => `  ${m.line}:${m.column} ${m.severity === 2 ? 'error' : 'warning'} ${m.message} (${m.ruleId})`).join('\n');
}).join('\n');
if (out) {
    fs.writeFileSync('lint_summary.txt', out);
} else {
    fs.writeFileSync('lint_summary.txt', "No lint errors or warnings!");
}
