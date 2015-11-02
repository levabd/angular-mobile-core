function isRequired(reference, requiredParams, missed, level ){

    if (!reference){
        reference = {};
    }
    if (!requiredParams){
        requiredParams = {};
    }
    if (!missed){
        missed = [];
    }
    if (!level){
        level = '';
    }


    // Если необходимые параметры объект
    if (typeof requiredParams === 'object') {

        // Перебор всех свойств необходимых параметров
        for ( var prop in requiredParams ) {

            // Необходимое свойство найдено в эталоне
            if (reference[prop]){

                // свойство является объектом в эталоне и необходимых параметрах
                if (typeof requiredParams[prop] === 'object' && typeof reference[prop] === 'object') {

                    // Проверить следующий уровень объекта
                    isRequired(reference[prop], requiredParams[prop], missed, level == '' ? prop :  level + '.' + prop );

                }


            }else{

                missed.push(level + '.' + prop);

            }

        }
        // если текущий уровень root
        if (level == ''){

            // количество пропущенных свойств в объекте
            if (missed.length > 0){
                return missed;
            }else{
                return [];
            }

        }


    }

}

