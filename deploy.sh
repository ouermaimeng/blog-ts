#!/bin/bash

echo "------------------------------------------------------------------------------"

cd /var/ftp/public_root/blog-fe/blog/

git pull origin master

npm run build

rm -rf /var/ftp/public_root/blog/dist

cp -rf /var/ftp/public_root/blog-fe/blog/dist/* /var/ftp/public_root/blog/dist/

exit