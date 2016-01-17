var MWBSInitSpace = MWBSInitSpace || {};
/* Registration and settings are defined here, users will supply their own username and key depending on which platform they will use
    @params
        mwbs - is the MWBScanner object, passed from the plugin function
        constants - the constants used for scanner settings
        dvc - the device on which it runs


 */
MWBSInitSpace.init = function(obj){

    if (!obj)
        obj = {};

    var defaultObj = {
        lang:'en',
        types: [],
        text: ' ',
        hasManual: false
    };

    obj = _.extend(defaultObj, obj );
    if (!obj.types){
        obj.types = [];
    }
    if (obj.types.length <= 0){
        obj.types = ['pdf']
    }

    console.log('init with params:', obj);




    return function(mwbs,constants,dvc){
        console.log('MWBSInitSpace.init Invoked at: '+ (new Date()).getTime());
        //change these registration settings to match your licence keys
        /* BEGIN Registration settings */

        //if your app doesn't work after setting license keys, try to uncomment the try-catch, and see what the error is

//    try{
        var mwregister = {
            'Android' : {
                'MWB_CODE_MASK_25' : {'username' : 'infoOstrain@gmail.com', 'key' : 'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_39' : {'username':'','key':''},
                'MWB_CODE_MASK_93' : {'username':'','key':''},
                'MWB_CODE_MASK_128' : {'username':'','key':''},
                'MWB_CODE_MASK_AZTEC' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_DM' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_EANUPC' : {'username':'','key':''},
                'MWB_CODE_MASK_PDF' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_QR' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_RSS' : {'username':'','key':''},
                'MWB_CODE_MASK_CODABAR' : {'username':'','key':''},
                'MWB_CODE_MASK_DOTCODE' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'}
            },
            'iOS' :{
                'MWB_CODE_MASK_25' : {'username' : 'infoOstrain@gmail.com', 'key' : 'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_39' : {'username':'','key':''},
                'MWB_CODE_MASK_93' : {'username':'','key':''},
                'MWB_CODE_MASK_128' : {'username':'','key':''},
                'MWB_CODE_MASK_AZTEC' : {'username':'','key':''},
                'MWB_CODE_MASK_DM' : {'username':'','key':''},
                'MWB_CODE_MASK_EANUPC' : {'username':'','key':''},
                'MWB_CODE_MASK_PDF' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_QR' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_RSS' : {'username':'','key':''},
                'MWB_CODE_MASK_CODABAR' : {'username':'','key':''},
                'MWB_CODE_MASK_DOTCODE' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'}
            },
            'Win32NT' : {
                'MWB_CODE_MASK_25' : {'username' : 'infoOstrain@gmail.com', 'key' : 'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_39' : {'username':'','key':''},
                'MWB_CODE_MASK_93' : {'username':'','key':''},
                'MWB_CODE_MASK_128' : {'username':'','key':''},
                'MWB_CODE_MASK_AZTEC' : {'username':'','key':''},
                'MWB_CODE_MASK_DM' : {'username':'','key':''},
                'MWB_CODE_MASK_EANUPC' : {'username':'','key':''},
                'MWB_CODE_MASK_PDF' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_QR' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'},
                'MWB_CODE_MASK_RSS' : {'username':'','key':''},
                'MWB_CODE_MASK_CODABAR' : {'username':'','key':''},
                'MWB_CODE_MASK_DOTCODE' : {'username':'infoOstrain@gmail.com','key':'CC671226552E7AB43EDB475B8A937D3596E598F94674EC70C387740F692C7291'}
            }
        }
//    }
//    catch(e){
//        console.log(e);
//    }
        /* END registration settings */

        //console.log('govno');

        //var platform = mwregister[dvc.platform];
        //Object.keys(platform).forEach(function(reg_codes){
        //    mwbs['MWBregisterCode'](constants[reg_codes],platform[reg_codes]['username'],platform[reg_codes]['key']);
        //});

        //settings portion, disable those that are not needed

        /* BEGIN settings CALLS */
        //if your code doesn't work after changing a few parameters, and there is no error output, uncomment the try-catch, the error will be output in your console
//    try{
        /*UNCOMMENT the lines you wish to include in the settings */
        mwbs['MWBsetInterfaceOrientation'] (constants.OrientationPortrait);
        mwbs['MWBsetOverlayMode'](constants.OverlayModeImage);

        switch(obj.lang) {
            case 'ru':

                mwbs['MWBsetManualButtonText']("Вручную");
                mwbs['MWBsetImageLngSuffix']("ru");
                break;
            case 'en':

                mwbs['MWBsetManualButtonText']("Manually");
                mwbs['MWBsetImageLngSuffix']("en");
                break;
            case 'kz':

                mwbs['MWBsetManualButtonText']("Қолмен");
                mwbs['MWBsetImageLngSuffix']("kz");
                break;
            default:

                mwbs['MWBsetManualButtonText']("Manually");
                mwbs['MWBsetImageLngSuffix']("en");
                break;
        }

        function setTitle(){
            mwbs['MWBsetAdditionalDescriptionText'](obj.text);
        }

        function normalizeTypes(types){
            var normalizedTypes = null;
            types.forEach(function(el, index){
                switch (obj.types[index]){
                    case 'barcode':{
                        normalizedTypes = normalizedTypes |
                            constants.MWB_CODE_MASK_25 |
                            constants.MWB_CODE_MASK_39 |
                            constants.MWB_CODE_MASK_93 |
                            constants.MWB_CODE_MASK_128 |
                            constants.MWB_CODE_MASK_EANUPC |
                            constants.MWB_CODE_MASK_CODABAR|
                            constants.MWB_CODE_MASK_RSS
                        ;
                    }break;
                    default:{
                        var maskType = constants['MWB_CODE_MASK_' + obj.types[index].toUpperCase()];
                        if (maskType){
                            normalizedTypes = normalizedTypes |
                                maskType
                            ;
                        }

                    }break;
                }
            });
            return normalizedTypes;
        }

        setTitle();
        mwbs['MWBsetTimeout'](1500);

        console.log('Types scanner: ', normalizeTypes(obj.types));

        mwbs['MWBsetActiveCodes'](normalizeTypes(obj.types));

        mwbs['MWBenableManualButton'](obj.hasManual);
        if (window.firstLaunch){
            mwbs['MWBenableOverlayInstructions'](true);
            window.firstLaunch = false;
        }else{
            mwbs['MWBenableOverlayInstructions'](false);
        }

        //mwbs['MWBenableHiRes'](true);
        //mwbs['MWBenableFlash'](true);



        //switch (obj.type){
        //    case 'alcohol':{
        //
        //        setTitle();
        //        mwbs['MWBsetTimeout'](1500);
        //
        //        mwbs['MWBsetActiveCodes'](constants.MWB_CODE_MASK_PDF);
        //        mwbs['MWBenableManualButton'](true);
        //        if (window.firstLaunch){
        //            mwbs['MWBenableOverlayInstructions'](true);
        //            window.firstLaunch = false;
        //        }else{
        //            mwbs['MWBenableOverlayInstructions'](false);
        //        }
        //
        //    }
        //        break;
        //    case 'cigarette':{
        //        mwbs['MWBsetAdditionalDescriptionText']("");
        //        mwbs['MWBsetActiveCodes'](constants.MWB_CODE_MASK_DM);
        //        mwbs['MWBenableManualButton'](true);
        //        mwbs['MWBenableOverlayInstructions'](false);
        //    }
        //        break;
        //    case 'barcode':{
        //        setTitle();
        //        mwbs['MWBsetTimeout'](1500);
        //        mwbs['MWBsetActiveCodes'](constants.MWB_CODE_MASK_DM);
        //        mwbs['MWBenableManualButton'](true);
        //        mwbs['MWBenableOverlayInstructions'](false);
        //    }
        //        break;
        //    case 'transfer':
        //    {
        //        mwbs['MWBsetAdditionalDescriptionText']("");
        //        mwbs['MWBsetActiveCodes'](constants.MWB_CODE_MASK_DM);
        //        mwbs['MWBenableManualButton'](false);
        //        mwbs['MWBenableOverlayInstructions'](false);
        //    }
        //        break;
        //    default:{
        //        mwbs['MWBsetAdditionalDescriptionText']("");
        //        mwbs['MWBsetActiveCodes'](constants.MWB_CODE_MASK_DM);
        //        mwbs['MWBenableManualButton'](true);
        //        if (window.firstLaunch){
        //            mwbs['MWBenableOverlayInstructions'](true);
        //            window.firstLaunch = false;
        //        }else{
        //            mwbs['MWBenableOverlayInstructions'](false);
        //        }
        //    }
        //        break;
        //}



        mwbs['MWBsetLevel'](2);
        //mwbs['MWBsetFlags'](constants.MWB_CODE_MASK_39, constants.MWB_CFG_CODE39_EXTENDED_MODE);
        //mwbs['MWBsetDirection'](constants.MWB_SCANDIRECTION_VERTICAL | constants.MWB_SCANDIRECTION_HORIZONTAL);
        //mwbs['MWBsetScanningRect'](constants.MWB_CODE_MASK_39, 20,20,60,60);
        //mwbs['MWBenableZoom'](true);
        //mwbs['MWBsetZoomLevels'](200, 400, 0);
        //mwbs['MWBsetCustomParam']('CUSTOM_PARAM','CUSTOM_VALUE');
        //mwbs['MWBsetActiveSubcodes'](constants.MWB_CODE_MASK_25 | constants.MWB_SUBC_MASK_C25_INTERLEAVED);
//    }
//    catch(e){
//        console.log(e);
//    }

        /* END settings CALLS */

        /* CUSTOM JAVASCRIPT CALLS */

    }
};
//custom callback function, one that can be modified by the user
MWBSInitSpace.callback = function(obj){
    if (!obj){
        obj = {};
    }
    return function(result) {

        //result.code - string representation of barcode result
        //result.type - type of barcode detected
        //result.bytes - bytes array of raw barcode result

        //console.log('Scan complete');
        loadModal.hide();
        window.firstLaunch = false;
       // window.plugins.insomnia.allowSleepAgain();

        if (result.type == 'Cancel') {

        }
        else
        if (result.type == 'Manual') {
            if (typeof obj.manual === 'function') {
                obj.manual();
            }
            //switch (obj.type){
            //    case 'alcohol':
            //        navigate.pushPage('services/verification/alcohol/manually.html');
            //        break;
            //    case 'cigarette':
            //        navigate.pushPage('services/verification/cigarette/cigarette-manually.html');
            //        break;
            //    case 'transfer':
            //        console.log('transfer mother FUCKER!!!');
            //        loadModal.hide();
            //        break;
            //    default:
            //        navigate.pushPage('services/verification/alcohol/manually.html');
            //        break;
            //}
        }
        else
        if (result.type == 'Timeout') {
            console.log('MWBSInitSpace.callback: Time out executed ');

            result.type = result.type.toLowerCase();

            if (typeof obj.timeout === 'function') {
                obj.timeout(result);
            }
        }
        else if (result && result.code) {
            result.type = result.type.toLowerCase();

            if (typeof obj.result === 'function') {
                obj.result(result);
            }

            //switch (obj.type){
            //    case 'alcohol':
            //        navigate.pushPage('services/verification/alcohol/item.htmlalcoholManuallyController', {code: result.code, type: result.type});
            //        break;
            //    case 'cigarette':
            //        navigate.pushPage('services/verification/cigarette/item.html', {code: result.code, type: result.type});
            //        break;
            //    case 'transfer':
            //        console.log('transfer mother FUCKER!!!');
            //        loadModal.hide();
            //        break;
            //    default:
            //        navigate.pushPage('services/verification/alcohol/item.htmlalcoholManuallyController', {code: result.code, type: result.type});
            //        break;
            //}

            navigator.vibrate(500);
        }
    }
}