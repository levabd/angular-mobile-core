function calcTime() {
    // create Date object for current location
    var d = Math.round((new Date() - new Date().getTimezoneOffset()) / 1000);

    // return time
    return d;
}