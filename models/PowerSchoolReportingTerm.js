/** 
 * A PowerSchool reporting term. Marks are divided and given out in reporting terms.
 * @hideconstructor
*/
class PowerSchoolReportingTerm {
    constructor(api, id, title, termID, sortOrder, suppressGrades, suppressPercents, abbreviatedTitle = null) {
        this.api = api;
        
        /**
         * The ID of this reporting term.
         * @member {number}
         */
        this.id = id;
        
        /**
         * The title of this reporting term.
         * @member {string}
         */
        this.title = title;

        /**
         * The ID of this reporting term's term.
         * @member {number}
         */
        this.termID = termID;
        
        /**
         * A number to use to sort this reporting term among others.
         * @member {number}
         */
        this.sortOrder = sortOrder;

        /**
         * Whether or not to supress showing grades from this reporting term.
         * @member {boolean}
         */
        this.suppressGrades = suppressGrades;

        /**
         * Whether or not to supress showing grade percentages from this reporting term.
         * @member {boolean}
         */
        this.suppressPercents = suppressPercents;

        /**
         * The abbreviated title of this reporting term, for use in smaller spaces.
         * @member {string}
         */
        this.abbreviatedTitle = this.abbreviatedTitle;
    }

    static fromData(data, api) {
        return new PowerSchoolReportingTerm(api, data.id, data.title, data.termid, data.sortOrder, data.suppressGrades, data.suppressPercents, data.abbreviation);
    }
    
    /**
     * Get the term this reporting term is from.
     * @return {PowerSchoolTerm}
     */
    getTerm() {
        return this.api._cachedInfo.terms[this.termID];
    }

    /**
     * Get the final grades returned from this reporting term.
     * @return {Array.<PowerSchoolFinalGrade>}
     */
    getFinalGrades() {
        return Object.values(this.api._cachedInfo.finalGrades).filter((g) => g.reportingTermID == this.id);
    }
}

module.exports = PowerSchoolReportingTerm;