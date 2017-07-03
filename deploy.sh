ionic cordova build browser
cd platforms/browser/www
git init
git add . 
git commit -m "auto deploy" 
git branch gh-pages 
git checkout gh-pages 
git remote add origin https://github.com/scrpgil/xpresenter.git
git push -f origin gh-pages
