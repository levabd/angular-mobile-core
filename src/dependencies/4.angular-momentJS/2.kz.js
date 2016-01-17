//! moment.js locale configuration
//! locale : kazakh (kz)
//! author : Aizhan Kozhabekova


(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../moment')) :
        typeof define === 'function' && define.amd ? define(['../../../bower_components/moment/moment'], factory) :
            factory(global.moment)
}(this, function (moment) { 'use strict';

    var suffixes = {
        1: '\'інші',
        5: '\'інші',
        8: '\'інші',
        70: '\'інші',
        80: '\'iнші',
        2: '\'інші',
        7: '\'інші',
        20: '\'сыншы',
        50: '\'інші',
        3: '\'інші',
        4: '\'інші',
        100: '\'інші',
        6: '\'ншы',
        9: '\'ыншы',
        10: '\'ыншы',
        30: '\'ыншы',
        60: '\'ыншы',
        90: '\'ыншы'
    };

    var tr = moment.defineLocale('kz', {
        months : 'Қаңтар_Ақпан_Наурыз_Сәуір_Мамыр_Маусым_Шілде_Тамыз_Қыркүйек_Қазан_Қараша_Желтоқсан'.split('_'),
        monthsShort : 'Қаң_Ақп_Нау_Сәу_Мам_Мау_Шіл_Там_Қыр_Қаз_Қар_Жел'.split('_'),
        weekdays : 'Жексенбі_Дүйсенбі_Сейсенбі_Сәрсенбі_Бейсенбі_Жұма_Сенбі'.split('_'),
        weekdaysShort : 'Жек_Дүй_Сей_Сәр_Бей_Жұма_Сен'.split('_'),
        weekdaysMin : 'Жк_Дс_Сс_Ср_Бс_Жм_Сн'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'LT:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd, D MMMM YYYY LT'
        },
        calendar : {
            sameDay : '[бүгін сағат] LT',
            nextDay : '[ертең сағат] LT',
            nextWeek : '[келесі аптада] dddd [сағат] LT',
            lastDay : '[кеше] LT',
            lastWeek : '[өткен аптада] dddd [сағат] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s кейін',
            past : '%s бұрын',
            s : 'бірнеше секунд',
            m : 'бір минут',
            mm : '%d минут',
            h : 'бір сағат',
            hh : '%d сағат',
            d : 'бір күн',
            dd : '%d күн',
            M : 'бір ай',
            MM : '%d ай',
            y : 'бір жыл',
            yy : '%d жыл'
        },
        ordinalParse: /\d{1,2}'(інші|нші|ыншы|нші|ыншы|інші)/,
        ordinal : function (number) {
            if (number === 0) {  // special case for zero
                return number + '\'інші';
            }
            var a = number % 10,
                b = number % 100 - а,
                c = number >= 100 ? 100 : null;
            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });



    return tr;

}));