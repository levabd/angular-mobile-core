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

### Что также несет собой ядро
Сервис для конфигурирования приложения - ***$mobileConfig***.
Пример использования:
```
     angular
            .module('app')
            .config($mobileConfigProvider);
    
        /////////////////////////////////////////
    
    
        $mobileConfigProvider.$inject = ['$mobileConfigProvider'];
        function $mobileConfigProvider($mobileConfigProvider){
    
            // Пишем в объект конфигурации.
            $mobileConfigProvider.config = {
            
                // текущее окружение.
                environment: 'production',
    
                // количество миллисекунд ожидания ответа от сервера.
                connection_timeout: 20000,
    
                // запустит приложение с чистым local storage.
                cleanStart: false,
    
                // в этом объекте нужно перечислить все окружения у вашего приложения.
                environments: {
                    
                    // теперь будет доступно окружение со строкой 'development'
                    development: {
                        /* address, port и apiVersion необходимая информация для того, чтобы $server мог построить
                           правильный URL к вашему серверу. URL строится по схеме: address:port/apiVersion/<ваш URL>
                           например: http://192.168.1.2:8181/v1/users
                        */
                        address: 'http://192.168.1.2',
                        port: '8181',
                        apiVersion: 'v1'
                    },
                    
                    // теперь будет доступно окружение со строкой 'review'
                    review:{
                        address: 'http://my-api.com',
                        port: '80',
                        apiVersion: 'v2'
                    }
    
                },
                
                // Объект security, простой способ защиты сервера от потусторонних запросов.
                security: {
                
                    // secret - строка известная вам и серверу
                    secret: 'mySecretString',
                    
                    /* uniqueKey - строка или число, которое будет различным на разных устройствах. Cервер должен знать
                       что именно вы используете в качестве уникального ключа для того, чтобы сверить ваш секрет на 
                       подлинность. В данном случае мы используем uuid устройства.
                    */
                    uniqueKey: device.uuid
                    
                    /* Метод шифрования(для сервера): MD5( security.secret + '_secret_' + MD5( security.uniqueKey ) ) */
                },
                
                
                // Объект headers запишет все свое содержимое в каждый запрос к серверу
                headers: {
                    deviceUuid: device.uuid,
                    devicePlatform: device.platform,
                    deviceVersion: device.version,
                    deviceModel: device.model
                }
    
            }
    
        }
```

Сервис для удобного логирования приложения - ***$console***.
```
    $console.instance('homeController'); // Поставит метку 'homeController' на каждое сообщение
    $console.instance('newPageController'); // Поставит метку 'newPageController' на каждое сообщение
    $console.backInstance(); // Вернет предыдущую метку 'homeController'.
    $console.clearInstance(): // Удалит всю историю меток и установит метку 'AppController'
    $console.info('Привет мир!'); // Красиво выведет сообщение 'Привет мир!' с пометкой INFO.
    $console.log('Привет мир!'); // Alias метода $console.info.
    $console.error('Нельзя делить на нуль'); // Выведет сообщение в консоль с пометкой ERROR.
    
    //Также можно добавлять информацию в заголовок сообщения, например в каком методе было вызвано данное сообщение:
    $console.info('Привет мир!', 'initialization()');
```

При наличии плагина ***cordova-plugin-app-version*** пишет текущую версию в headers.

При наличии плагина ***cordova-plugin-geolocation*** пишет текущую геолокацию в headers(longitude, latitude, accuracy)



### Установка
- Подключите файл build/angular-mobile-core.js перед вашими скриптами.
- Затем подключите модуль в вашем приложении, примерно как показано ниже:
```
angular.module('app', ['mobile-core'])
```
