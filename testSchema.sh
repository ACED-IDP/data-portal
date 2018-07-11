#!/bin/bash

set -e

declare -A testCases
testCases=(
[bpa]="data.bloodpac.org"
[bhc]="data.braincommons.org"
[gtex]="dcp.bionimbus.org"
[dev]="dev.planx-pla.net"
[edc]="portal.occ-data.org"
[genomel]="genomel.bionimbus.org"
[kf]="data.kidsfirstdrc.org"
[kfDcfInterop]="dcf-interop.kidsfirstdrc.org"
[ndh]="niaid.bionimbus.org"
)
for APP in "${!testCases[@]}"; do
  export APP
  export HOSTNAME="${testCases[$APP]}"
  npm run schema
  npm run relay
done