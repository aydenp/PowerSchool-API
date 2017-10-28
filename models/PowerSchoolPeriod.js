/** 
 * A PowerSchool period.
 * @hideconstructor
*/
class PowerSchoolPeriod {
    constructor(api, id, name, number, schoolNumber, sortOrder, yearID) {
        this.api = api;

        /**
         * The ID of this period.
         * @member {number}
         */
        this.id = id;

        /**
         * The name of this period.
         * @member {string}
         */
        this.name = name;

        /**
         * The number of this period.
         * @member {number}
         */
        this.number = number;

        /**
         * The number of the school this period is from.
         * @member {number}
         */
        this.schoolNumber = schoolNumber;
        
        /**
         * A number to use to sort this period among others.
         * @member {number}
         */
        this.sortOrder = sortOrder;

        /**
         * The year ID of this period.
         * @member {number}
         */
        this.yearID = yearID;
    }

    static fromData(data, api) {
        return new PowerSchoolPeriod(api, data.id, data.name, data.periodNumber, data.schoolid, data.sortOrder, data.yearid);
    }

    /**
     * Get the school this period is from.
     * @return {PowerSchoolSchool}
     */
    getSchool() {
        return this.api._cachedInfo.schools[this.schoolID];
    }
}

module.exports = PowerSchoolPeriod;