#!/usr/bin/env bash
# Deterministic boundary-frame extraction and scroll-scrub encoding.
set -euo pipefail

usage() {
  echo "Usage: $0 {bounds|desktop|mobile|poster} <input> <output>" >&2
  exit 2
}
require_command() {
  command -v "$1" >/dev/null 2>&1 || { echo "Missing required command: $1" >&2; exit 127; }
}
require_input() {
  [ -f "$1" ] || { echo "Input file does not exist: $1" >&2; exit 2; }
}
ensure_parent() {
  local parent
  parent=$(dirname "$1")
  mkdir -p "$parent"
}

[ "$#" -eq 3 ] || usage
require_command ffmpeg
action=$1
input=$2
output=$3
require_input "$input"

case "$action" in
  bounds)
    ensure_parent "$output-first.png"
    ffmpeg -v error -y -ss 0 -i "$input" -frames:v 1 -q:v 2 "$output-first.png"
    ffmpeg -v error -y -i "$input" -vf reverse -frames:v 1 -q:v 2 "$output-last.png"
    ;;
  desktop)
    ensure_parent "$output"
    ffmpeg -v error -y -i "$input" -an -vf "scale=1280:-2,unsharp=5:5:0.7:5:5:0.0" -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$output"
    ;;
  mobile)
    ensure_parent "$output"
    ffmpeg -v error -y -i "$input" -an -vf "scale=854:-2,unsharp=5:5:0.5:5:5:0.0" -c:v libx264 -preset slow -crf 32 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "$output"
    ;;
  poster)
    ensure_parent "$output"
    ffmpeg -v error -y -ss 0 -i "$input" -frames:v 1 -q:v 2 "$output"
    ;;
  *) usage ;;
esac
