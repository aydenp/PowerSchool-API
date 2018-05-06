/** 
 * A code assigned to a PowerSchool attendance record.
 * @hideconstructor
*/
class PowerSchoolAttendanceCode {
    constructor(api, id, code, description, type, schoolNumber, sortOrder, yearID) {
        this.api = api;

        /**
         * The ID of this attendance code.
         * @member {number}
         */
        this.id = id;

        /**
         * The string representing this code.
         * @member {string}
         */
        this.code = code;

        /**
         * A short description of this code.
         * @member {string}
         */
        this.description = description;

        /**
         * The type of this code.
         * @member {number}
         */
        this.type = type;

        /**
         * The number of the school this code belongs to.
         * @member {number}
         */
        this.schoolNumber = schoolNumber;

        /**
         * A number representing the order this code should appear in when sorted.
         * @member {number}
         */
        this.sortOrder = sortOrder;

        /**
         * The year ID this code is valid for.
         * @member {number}
         */
        this.yearID = yearID;
    }

    static fromData(data, api) {
        return new PowerSchoolAttendanceCode(api, data.id, data.attCode, data.description, data.codeType, data.schoolid, data.sortorder, data.yearid);
    }

    /**
     * Get the school this code belongs to.
     * @return {PowerSchoolSchool}
     */
    getSchool() {
        return this.api._cachedInfo.schools[this.schoolNumber];
    }
}

module.exports = PowerSchoolAttendanceCode;