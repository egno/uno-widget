#!/bin/bash

git pull && \
npm i && \
npm run build && \
rm -rf ../widget/* && \
cp -r dist/* ../widget && \
git log | head -n 6 | \
sed 's/<\(.*@.*\)>/<a href="mailto:\1">\1<\/a>/' | \
sed 's/$/<br>/g' | \
sed 's/^\(\s*\)#\([0-9]*\)/\1<a href="https:\/\/redmine.gisauto.ru\/issues\/\2">#\2<\/a>/g' | \
sed 's/\([0-9a-f]\{40\}\)/<a href="https:\/\/github.com\/egno\/uno-widget\/commit\/\1">\1<\/a>/g' \
> ../widget/version.html && \
echo "Deployed successfully"

