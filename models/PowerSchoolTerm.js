/** 
 * A PowerSchool term, for which courses can be a part of.
 * @hideconstructor
*/
class PowerSchoolTerm {
    constructor(api, id, title, startDate, endDate, parentTermID, schoolNumber, abbreviatedTitle = null) {
        this.api = api;

        /**
         * The ID of this term.
         * @member {number}
         */
        this.id = id;

        /**
         * The title of this term.
         * @member {string}
         */
        this.title = title;

        /**
         * The start date of this term.
         * @member {Date}
         */
        this.startDate = startDate;

        /**
         * The end date of this term.
         * @member {Date}
         */
        this.endDate = endDate;

        /**
         * The ID of this term's parent (0 if none).
         * @member {number}
         */
        this.parentTermID = parentTermID;

        /**
         * The number of the school this term is from.
         * @member {number}
         */
        this.schoolNumber = schoolNumber;

        /**
         * The abbreviated title of this term, for use in smaller spaces.
         * @member {string}
         */
        this.abbreviatedTitle = abbreviatedTitle;
    }

    static fromData(data, api) {
        return new PowerSchoolTerm(api, data.id, data.title, new Date(data.startDate), new Date(data.endDate), data.parentTermId, data.schoolNumber, data.abbrev);
    }

    /**
     * Get the school this term is from.
     * @return {PowerSchoolSchool}
     */
    getSchool() {
        return this.api._cachedInfo.schools[this.schoolNumber];
    }
}

module.exports = PowerSchoolTerm;