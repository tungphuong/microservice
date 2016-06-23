'use strict'

class CommonUtil {
    isBlank (value) {
        return value === null ||  value === undefined || value === '';
    }
}

module.exports = new CommonUtil();