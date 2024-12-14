#!/bin/bash

# Front end
cd /home/csning/Documents/GitHub/e-commerce-full-stack/frontend
npm run build-only
rsync -av ./dist/* e-commerce-miia.com:/var/www/e-commerce-miia.com
cd /home/csning/Documents/GitHub/e-commerce-full-stack

# Backend....