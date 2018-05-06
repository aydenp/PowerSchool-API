/** 
 * An object representing the final grade in a PowerSchool course.
 * @hideconstructor
*/
class PowerSchoolFinalGrade {
    constructor(api, id, grade, percentage, date, comment, reportingTermID, courseID) {
        this.api = api;
        
        /**
         * The ID of this event.
         * @member {number}
         */
        this.id = id;

        /**
         * The grade received in this course, to be displayed.
         * @member {string}
         */
        this.grade = grade;

        /**
         * The grade received in this course as a percentage (value from 0-1), if can be calculated.
         * @member {number}
         */
        this.percentage = percentage;

        /**
         * The date this mark was stored, if available.
         * @member {Date}
         */
        this.date = date;

        /**
         * The teacher's comment for this grade, if available.
         * @member {string}
         */
        this.comment = comment;

        /**
         * The identifier of the reporting term this grade is from.
         * @member {number}
         */
        this.reportingTermID = reportingTermID;

        /**
         * The identifier of the course this grade is from.
         * @member {number}
         */
        this.courseID = courseID;
    }

    static fromData(data, api) {
        return new PowerSchoolFinalGrade(api, data.id, data.grade, data.percent / 100, data.dateStored ? new Date(data.dateStored) : null, data.commentValue, data.reportingTermId, data.sectionid);
    }

    /**
     * Get the reporting term this grade is from.
     * @return {PowerSchoolReportingTerm}
     */
    getReportingTerm() {
        return this.api._cachedInfo.reportingTerms[this.reportingTermID];
    }

    /**
     * Get the course this grade is from.
     * @return {PowerSchoolCourse}
     */
    getCourse() {
        return this.api._cachedInfo.courses[this.courseID];
    }
}

module.exports = PowerSchoolFinalGrade;