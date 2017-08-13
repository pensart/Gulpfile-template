# Gulpfile template
My default gulpfile to automate some tasks.
>*Time is the most precious thing in the world!*

## Latest updates
### 10 aug 2017
- [x] Environment selection production / development
- [x] Select environment when running gulp
- [x] Css, Html and Javascript minification
- [x] Sourcemaps in development mode
### 11 aug 2017
- [x] Selecting of job and tasks is added
- [x] Task to clean(delete) environment specific directory
### 13 aug 2017
- [x] Totally rewrite for configuring the build/watch process

## Environment settings (selectable)
```javascript
$ gulp start
[14:58:15] Using gulpfile D:\testen\Gulpfile-template\gulpfile.js
[14:58:15] Starting 'default'...
? What Job to perform? (Use arrow keys)
? What Job to perform? production
? Select which tasks... (Press <space> to select, <a> to toggle all, <i> to inverse selection)
>( ) run all
 ( ) build
 ( ) watch
 ( ) browserSync
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

