#!/usr/bin/env bash

BASE_DIR="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 || exit 1 ; pwd -P )"
cd "$BASE_DIR"

## Leaving out IPATH since it resolves to the current directory anyway (and we switched to it already!)
#protoc \
#  --java_out="/home/atwrdik/Development/AMPEL/ampel/messaging-sdk/java/src/main/java" \
#  $(find . -name "*.proto" -type f | tr '\n' ' ')


# Takes the exit code as a single argument - if not set it's 0
display_help_and_exit() {
  echo "Usage: helper.sh <command>"
  echo ""
  echo "Commands:"
  echo -e "\tbuild-for-java \t\tbuilds proto files for the Java based SDK"

  exit ${1:-0}
}

build_for_java() {
  # Leaving out IPATH since it resolves to the current directory anyway (and we switched to it already!)

  # This is the base dir as all the package information is defined within the .proto files itself.
  JAVA_OUT_BASE_DIR="${BASE_DIR}/../java/src/main/java"
  protoc \
    --java_out="${JAVA_OUT_BASE_DIR}" \
    $(find . -name "*.proto" -type f | tr '\n' ' ')
}

if [ $# -eq 0 ]; then
  display_help_and_exit 1
fi

command=$1
case $command in
  "" | "-h" | "--help")
   display_help_and_exit
   ;;

  "build-for-java")
    shift
    build_for_java
    ;;

 *)
   display_help_and_exit 1
   ;;
esac
