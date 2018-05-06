/** 
 * A PowerSchool course.
 * @hideconstructor
*/
class PowerSchoolCourse {
    constructor(api, id, title, code, schoolNumber, termID, periodSort, roomName, sectionNumber, teacherID, expression, gradeBookType, description = null) {
        this.api = api;

        /**
         * The ID of this course.
         * @member {number}
         */
        this.id = id;

        /**
         * The title of this course.
         * @member {string}
         */
        this.title = title;

        /**
         * The code of this course.
         * @member {string}
         */
        this.code = code;

        /**
         * The number of the school this course is from.
         * @member {number}
         */
        this.schoolNumber = schoolNumber;

        /**
         * The ID of the term this course is a part of.
         * @member {number}
         */
        this.termID = termID;

        /**
         * A number to use to sort this period among others.
         * @member {number}
         */
        this.periodSort = periodSort;

        /**
         * The name of the room this course takes place in.
         * @member {string}
         */
        this.roomName = roomName;

        /**
         * The number of the section this course is in.
         * @member {string}
         */
        this.sectionNumber = sectionNumber;

        /**
         * The ID of the teacher teaching this course.
         * @member {string}
         */
        this.teacherID = teacherID;

        /**
         * An expression to use to sort this course's period among others.
         * @member {string}
         */
        this.expression = expression;

        /**
         * The coursebook type of this course.
         * @member {number}
         */
        this.gradeBookType = gradeBookType;

        /**
         * The description text of this course.
         * @member {string}
         */
        this.description = description;
    }

    static fromData(data, api) {
        return new PowerSchoolCourse(api, data.id, data.schoolCourseTitle, data.courseCode, data.schoolNumber, data.termID, data.periodSort, data.roomName, data.sectionNum, data.teacherID, data.expression, data.gradeBookType, data.description);
    }

    /**
     * Get the term this course is a part of.
     * @return {PowerSchoolTerm}
     */
    getTerm() {
        return this.api._cachedInfo.terms[this.termID];
    }

    /**
     * Get the school this course is from.
     * @return {PowerSchoolSchool}
     */
    getSchool() {
        return this.api._cachedInfo.schools[this.schoolNumber];
    }

    /**
     * Get the teacher teaching this course.
     * @return {PowerSchoolTeacher}
     */
    getTeacher() {
        return this.api._cachedInfo.teachers[this.teacherID];
    }

    /**
     * Get the final grade received in this course, if available.
     * @return {PowerSchoolFinalGrade}
     */
    getFinalGrade() {
        return this.api._cachedInfo.finalGrades[this.id];
    }

    /**
     * Get any assignments associated with this course.
     * **NOTE:** This function filters through all assignments every time it is called, so use it sparingly.
     * @return {Array.<PowerSchoolAssignment>}
     */
    getAssignments() {
        return Object.values(this.api._cachedInfo.assignments).filter((a) => a.courseID == this.id);
    }
}

module.exports = PowerSchoolCourse;