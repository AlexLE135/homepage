set -euo pipefail
export ANTHROPIC_AUTH_TOKEN=sk-db41b7b3fcf14fd29ec03ae3f977690f
export ANTHROPIC_BASE_URL="https://api.deepseek.com/v1"
export ANTHROPIC_MODEL=deepseek-reasoner
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-reasoner
claude "$@"

