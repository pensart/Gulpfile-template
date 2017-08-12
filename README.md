# Gulpfile template
My default gulpfile to automate some tasks.
>*Time is the most precious thing in the world!*

## Latest updates
### 10 aug 2017
- [x] Environment selection production / development
- [x] Select environment when running gulp watch
- [x] Css, Html and Javascript minification
- [x] Sourcemaps
### 11 aug 2017
- [x] Selecting of job and tasks is added
- [x] Task to clean(delete) environment specific directory

## Environment settings (selectable)
```javascript
$ gulp start
[22:13:44] Using gulpfile D:\testen\Gulpfile-template\gulpfile.js
[22:13:44] Starting 'watch'...
? Select your environment... (Use arrow keys)
> production
  development
? What job to perform?
  build
> watch
  both
  clean
? Select which tasks...
  () pages
  () styles
  () es6Modules
```

feature | development | production
--- | --- | ---
*Formatting* |
*`Css`* | Nested | Compressed
*`Html`* | Beautified | Compressed
*`Javascript`* | Normal | Compressed
*Sourcemaps* |
*`Css`* | Yes | No
*`Js`* | Yes | No

## Next update ideas
- [x] Option to use PUG instead of html
- [x] More specific clean task

