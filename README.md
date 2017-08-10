# Gulpfile template
My default gulpfile to automate some tasks.
>*Time is the most precious thing in the world!*


## update 10 aug 2017
- [x] Environment selection production / development
- [x] Select environment when running gulp watch
- [x] Css, Html and Javascript minification
- [x] Sourcemaps


## Environment settings (selectable)
```javascript
$ gulp watch
[22:13:44] Using gulpfile D:\testen\Gulpfile-template\gulpfile.js
[22:13:44] Starting 'watch'...
? Select your environment... (Use arrow keys)
> production
  development
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
- [x] Selection to build/watch all or specific tasks
- [x] Selection to open new browser watch window or only refresh
- [x] Option to use PUG instead of html

