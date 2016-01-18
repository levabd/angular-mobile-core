# [![angular-mobile-core](https://raw.githubusercontent.com/wipon/angular-mobile-core/master/logo.png)](http://wipon.github.io/angular-mobile-core)
![Bower](https://img.shields.io/bower/v/angular-mobile-core.svg) [![NPM](https://img.shields.io/npm/v/angular-mobile-core.svg)](https://www.npmjs.com/package/angular-mobile-core)
> Фундамент для мобильных приложений

### Описание
Модуль для **~ AngularJS 1.4.x** с набором необходимых библиотек для быстрого старта на стеке **angular** + **cordova**.

### Включенные библиотеки
- **angular-cookies**
- **angular-local-storage**
- **angular-translate** с опциями *loader-static-files, storage-cookie, storage-local.*
- **ngCordova** с опциями *appVersion, camera, googleAnalytics, imagePicker, push, toast.*
- **underscore**
- **cryptoJs(md5)**
- **momentJS**

### Установка
- Подключите файл build/angular-mobile-core.js перед вашими скриптами.
- Затем подключите модуль в вашем приложении, примерно как показано ниже:
```
angular.module('app', ['mobile-core'])
```
