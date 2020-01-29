#!/bin/bash

# The script builds the package and publishes it to npm.

set -e

sed -i -e 's/main\":\ ".*\.js/main\":\ "dist\/index.js/g' package.json
