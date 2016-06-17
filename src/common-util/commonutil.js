'use strict'

class CommonUtil {
    isBlank (valer) {
        if (valer === null || valer === undefined || valer === '')
            return true;
        else
            return false;
    }
}

module.exports = new CommonUtil();