#!/bin/sh
config=`tr '\n' ' ' < config.json`
sed -i 's*<injection-script></injection-script>*<div style="display: none" id="inventory-config">'"$config"'</div>*g' /app/index.html
find /app -type f -print0 | xargs -0 sed -i 's*/__public_path__/*'$PUBLIC_PATH'*g'
exec nginx -g "daemon off;"
