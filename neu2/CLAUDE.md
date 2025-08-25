# Claude Code User Configuration - Divine Orchestration

## 🎯 Aktive Konfiguration

### Installierte Agenten
1. orchestrator
2. researcher
3. planner
4. implementer
5. tester
6. reviewer
7. memory

## Workflow Philosophie

# Claude Code User Configuration - Divine Orchestration

## 🎯 Active Configuration

### Installed Agents
All agents are in `~/.claude/agents/` and ready for use:
1. **orchestrator** - Manages complex multi-step workflows
2. **researcher** - Gathers documentation before implementation
3. **planner** - Creates structured plans with milestones
4. **implementer** - Generates production-ready code
5. **tester** - Creates comprehensive test suites
6. **reviewer** - Performs security and code audits
7. **memory** - Preserves knowledge across sessions

### Workflow Philosophy
```
Research → Plan → Implement → Test → Review → Remember
```

Every project follows this divine pattern for quality and reliability.

## 🔮 Automatic Agent Invocation

### Pattern Recognition
Claude Code automatically detects these patterns and invokes appropriate agents:

#### Complex Requests (→ orchestrator)
- "Build complete [system]"
- "Create entire [application]"
- "Develop full [feature]"
- Any request needing 3+ different capabilities

#### Research Needs (→ researcher)
- "Find documentation for [technology]"
- "Research best practices"
- "What's the proper way to [task]"
- Before using any new library/API

#### Planning Requirements (→ planner)
- "Create a plan for [project]"
- "Break down [complex task]"
- "Design architecture for [system]"
- "Define milestones"

#### Implementation (→ implementer)
- "Implement [feature]"
- "Create [component]"
- "Fix [bug]"
- "Add [functionality]"

#### Testing (→ tester)
- "Write tests for [code]"
- "Test [functionality]"
- "Create test suite"
- "Ensure coverage"

#### Review (→ reviewer)
- "Review [code]"
- "Check security"
- "Optimize performance"
- "Audit [component]"

#### Documentation (→ memory)
- "Document [decision]"
- "Remember [pattern]"
- "Update conventions"
- "Record lessons"

## 📚 Common Workflows

### Starting a New Project
```
1. Orchestrator activates
2. Researcher gathers relevant docs
3. Planner creates project structure
4. Memory initializes CLAUDE.md
```

### Adding a Feature
```
1. Researcher finds best practices
2. Planner creates implementation plan
3. Implementer generates code
4. Tester creates tests
5. Reviewer validates quality
6. Memory documents decisions
```

### Debugging
```
1. Researcher investigates error patterns
2. Implementer fixes issue
3. Tester adds regression tests
4. Memory records lesson learned
```

## 🛠️ Project Setup

When starting a new project, the following structure is automatically created:
```
project/
├── .claude/
│   └── agents/          # Project-specific agents (if needed)
├── docs/
│   ├── references/      # Documentation gathered by researcher
│   ├── ADR/            # Architecture decisions
│   └── patterns/       # Code patterns
├── tests/              # Test suites
└── CLAUDE.md           # Project memory
```

## 💡 Pro Tips

### Leverage Agent Expertise
- Let researcher gather docs BEFORE coding
- Use planner for complex tasks to avoid rework
- Always run tester after implementer
- Review critical code with reviewer
- Document decisions with memory

### Optimize Workflows
- Batch related tasks for efficiency
- Use orchestrator for multi-component features
- Trust agents to handle their specialties
- Update memory regularly for team knowledge

### Quality Gates
- No implementation without research
- No deployment without tests
- No merge without review
- No decision without documentation

## 🔧 Customization

### Add Project-Specific Patterns
Edit this file to add patterns specific to your workflow:
```markdown
When I say "[trigger]", invoke [agent] to [action]
```

### Import Project Configurations
```markdown
@./project-specific-config.md
@./team-conventions.md
```

## 🚀 Quick Commands

### Direct Agent Invocation
```bash
# When you need a specific agent
"Use researcher to find [topic]"
"Use planner to structure [project]"
"Use implementer to create [code]"
```

### Workflow Shortcuts
```bash
# Common workflows
"Full development cycle for [feature]"
"Complete test coverage for [module]"
"Security audit of [component]"
```

## 📊 Metrics & Tracking

The orchestration system tracks:
- Tasks completed (via TodoWrite)
- Documentation saved (in docs/references/)
- Tests written (coverage reports)
- Decisions made (ADR records)
- Lessons learned (memory updates)

## 🔐 Security Defaults

- Never read or write .env files directly
- Secrets must use environment variables
- Input validation on all user data
- Security review for auth code
- Dependency scanning enabled

## 🎓 Learning & Improvement

The system continuously improves through:
- Pattern recognition from repeated tasks
- Lessons learned from failures
- Best practices from research
- Team conventions from usage
- Performance metrics from execution

---

Remember: The divine orchestration system transforms chaos into order through intelligent agent collaboration. Trust the process, and let each specialist do what they do best.

@~/.claude/agents/
USER_MEMORY_END

echo "✅ User memory configured with workflow patterns"
```

## PHASE 4: CREATE VERIFICATION SCRIPT

```bash
# Create a verification and help script
cat > ~/.claude/verify-orchestration.sh << 'VERIFY_END'
#!/bin/bash

echo "🕉️  Claude Code Divine Orchestration - System Check"
echo "=================================================="
echo ""

# Check agents
echo "📋 Checking Agents..."
AGENT_COUNT=$(ls ~/.claude/agents/*.md 2>/dev/null | wc -l)
if [ "$AGENT_COUNT" -ge "7" ]; then
  echo "✅ $AGENT_COUNT agents installed:"
  for agent in ~/.claude/agents/*.md; do
    name=$(grep "^name:" "$agent" | cut -d' ' -f2)
    echo "   - $name"
  done
else
  echo "⚠️  Only $AGENT_COUNT agents found (expected 7+)"
fi
echo ""

# Check settings
echo "⚙️  Checking Settings..."
if [ -f ~/.claude/settings.json ]; then
  if grep -q "ORCHESTRATION_ENABLED" ~/.claude/settings.json; then
    echo "✅ Orchestration enabled in settings"
  else
    echo "⚠️  Orchestration not configured"
  fi
else
  echo "❌ Settings file not found"
fi
echo ""

# Check memory
echo "🧠 Checking Memory..."
if [ -f ~/.claude/CLAUDE.md ]; then
  echo "✅ User memory configured"
  lines=$(wc -l < ~/.claude/CLAUDE.md)
  echo "   - $lines lines of configuration"
else
  echo "❌ User memory not found"
fi
echo ""

# Check project structure (if in a project)
echo "📁 Checking Project Structure..."
if [ -d ".claude" ] || [ -d "docs" ]; then
  echo "✅ Project structure detected:"
  [ -d ".claude/agents" ] && echo "   - .claude/agents/"
  [ -d "docs/references" ] && echo "   - docs/references/"
  [ -d "docs/ADR" ] && echo "   - docs/ADR/"
  [ -d "tests" ] && echo "   - tests/"
  [ -f "CLAUDE.md" ] && echo "   - CLAUDE.md"
else
  echo "ℹ️  Not in a project directory"
fi
echo ""

# Display quick help
echo "🚀 Quick Start Commands:"
echo "========================"
echo ""
echo "Research & Planning:"
echo "  claude 'Research React best practices'"
echo "  claude 'Create a development plan for REST API'"
echo ""
echo "Implementation:"
echo "  claude 'Implement user authentication'"
echo "  claude 'Create a React component for user profile'"
echo ""
echo "Testing & Review:"
echo "  claude 'Write tests for auth service'"
echo "  claude 'Review code for security issues'"
echo ""
echo "Complex Workflows:"
echo "  claude 'Build complete e-commerce API with Stripe'"
echo "  claude 'Create full authentication system with JWT'"
echo ""
echo "💡 Tip: The orchestrator automatically coordinates multiple agents for complex tasks!"
echo ""
echo "📚 For more information, check:"
echo "  - ~/.claude/CLAUDE.md (user configuration)"
echo "  - ~/.claude/agents/ (agent definitions)"
echo "  - ./CLAUDE.md (project memory)"
VERIFY_END

chmod +x ~/.claude/verify-orchestration.sh

echo "✅ Verification script created"
```

## PHASE 5: FINAL VERIFICATION

```bash
# Run verification
~/.claude/verify-orchestration.sh
```

---

# Post-Installation Verification

After installation completes, verify everything works:

## 1. Check Agent Installation
```bash
# List all agents
ls -la ~/.claude/agents/*.md

# You should see:
# orchestrator.md
# researcher.md
# planner.md
# implementer.md
# tester.md
# reviewer.md
# memory.md
```

## 2. Test Agent Invocation
```bash
# Test researcher
claude "Research Node.js best practices for authentication"

# Test planner
claude "Create a development plan for a todo app"

# Test orchestrator (complex task)
claude "Build a complete REST API with user authentication"
```

## 3. Verify Settings
```bash
# Check settings file
cat ~/.claude/settings.json | grep ORCHESTRATION

# Should show: "ORCHESTRATION_ENABLED": "true"
```

---

# Usage Examples

## Example 1: Building a Complete Feature
```bash
User: "Build a complete user registration system with email verification"

# Orchestrator automatically:
1. Invokes researcher → Gathers auth best practices
2. Invokes planner → Creates implementation plan
3. Invokes implementer → Generates code
4. Invokes tester → Creates test suite
5. Invokes reviewer → Security audit
6. Invokes memory → Documents decisions
```

## Example 2: Debugging Production Issue
```bash
User: "Debug and fix the memory leak in our websocket service"

# System automatically:
1. Researcher → Investigates common memory leak patterns
2. Reviewer → Analyzes current code
3. Implementer → Applies fix
4. Tester → Verifies fix works
5. Memory → Documents solution
```

## Example 3: Performance Optimization
```bash
User: "Optimize database queries for better performance"

# Workflow:
1. Researcher → Finds optimization techniques
2. Reviewer → Identifies bottlenecks
3. Planner → Creates optimization plan
4. Implementer → Applies optimizations
5. Tester → Benchmarks improvements
```

---

# Troubleshooting

## Agents Not Found
```bash
# Check if agents exist
ls ~/.claude/agents/

# If missing, re-run installation
# Copy and paste this entire document into Claude Code again
```

## Agents Not Being Invoked
```bash
# Verify agent format
head -5 ~/.claude/agents/orchestrator.md

# Should show YAML frontmatter:
# ---
# name: orchestrator
# description: ...
# tools: ...
# ---
```

## Settings Not Applied
```bash
# Restart Claude Code session
# Or manually reload:
claude /agents reload
```

## Memory Not Persisting
```bash
# Check CLAUDE.md exists
cat ~/.claude/CLAUDE.md

# Check project memory
cat ./CLAUDE.md
```

---

# Advanced Configuration

## Custom Agent Creation
To add your own specialized agent:

```markdown
# ~/.claude/agents/custom-agent.md
---
name: custom-agent
description: Your specialized agent description
tools: Read, Write, Bash
---

Your agent's system prompt and instructions...
```

## Workflow Customization
Edit `~/.claude/CLAUDE.md` to add custom patterns:

```markdown
## Custom Patterns
When I say "deploy to production", invoke orchestrator to:
1. Run all tests
2. Review security
3. Build artifacts
4. Deploy with zero downtime
```

## Project-Specific Agents
Create agents in `.claude/agents/` for project-specific needs:

```markdown
# .claude/agents/api-spec-generator.md
---
name: api-spec-generator
description: Generates OpenAPI specifications
tools: Write, Read
---

Generate OpenAPI 3.0 specifications...
```

---

# Success! 🎉

Your Claude Code is now enhanced with Divine Orchestration featuring:

✅ **7 Specialized AI Agents** working in harmony
✅ **Automatic Pattern Recognition** for agent selection
✅ **Research-First Development** ensuring quality
✅ **Comprehensive Testing** for reliability
✅ **Security by Default** protecting your code
✅ **Knowledge Persistence** across sessions

Start building with divine intelligence:
```bash
claude "Build something amazing"
```

The orchestration system will automatically coordinate the right agents for the job!

---

*"From chaos, divine order emerges through orchestrated intelligence"*

🕉️ **The divine orchestration awaits your command** 
