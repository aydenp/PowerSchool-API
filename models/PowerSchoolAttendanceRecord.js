/** 
 * A PowerSchool attendance record, such as a deviation from normal attendance.
 * @hideconstructor
*/
class PowerSchoolAttendanceRecord {
    constructor(api, id, codeID, comment, date, schoolNumber, periodID, studentID, totalMinutes) {
        this.api = api;

        /**
         * The ID of this attendance code.
         * @member {number}
         */
        this.id = id;

        /**
         * The identifier for this attendance record's code.
         * @member {number}
         */
        this.codeID = codeID;

        /**
         * A comment left with this record.
         * @member {string}
         */
        this.comment = comment;

        /**
         * The date the attendance for this record occurred on.
         * @member {Date}
         */
        this.date = date;

        /**
         * The number of the school this record was created by.
         * @member {number}
         */
        this.schoolNumber = schoolNumber;

        /**
         * The identifier of the period this record covers.
         * @member {number}
         */
        this.periodID = periodID;

        /**
         * The identifier of the student this record involves.
         * @member {number}
         */
        this.studentID = studentID;

        /**
         * The number of minutes this record accounts for, if not all (zero).
         * @member {number}
         */
        this.totalMinutes = totalMinutes;
    }

    static fromData(data, api) {
        return new PowerSchoolAttendanceRecord(api, data.id, data.attCodeid, data.attComment, new Date(data.attDate), data.schoolid, data.periodid, data.studentid, data.totalMinutes);
    }

    /**
     * Get the school this record belongs to.
     * @return {PowerSchoolSchool}
     */
    getSchool() {
        return this.api._cachedInfo.schools[this.schoolNumber];
    }

    /**
     * Get the period this record covers.
     * @return {PowerSchoolPeriod}
     */
    getPeriod() {
        return this.api._cachedInfo.periods[this.periodID];
    }

    /**
     * Get the code of this record.
     * @return {PowerSchoolAttendanceCode}
     */
    getCode() {
        return this.api._cachedInfo.attendanceCodes[this.codeID];
    }
}

module.exports = PowerSchoolAttendanceRecord;