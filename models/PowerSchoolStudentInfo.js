/**
 * Holds information about the student.
 * @hideconstructor
*/
class PowerSchoolStudentInfo {
    constructor() {
        /**
         * The student's school.
         * @member {PowerSchoolSchool}
         */
        this.schools = null;

        /**
         * The student's available periods.
         * @member {Array.<PowerSchoolPeriod>}
         */
        this.periods = null;

        /**
         * The student's current courses.
         * @member {Array.<PowerSchoolCourse>}
         */
        this.courses = null;

        /**
         * The student's available terms.
         * @member {Array.<PowerSchoolTerm>}
         */
        this.terms = null;

        /**
         * The student's reporting terms.
         * @member {Array.<PowerSchoolReportingTerm>}
         */
        this.reportingTerms = null;

        /**
         * The student's days where school isn't in session.
         * @member {Array.<PowerSchoolEvent>}
         */
        this.notInSessionDays = null
        
        /**
         * An object holding basic information about this student.
         * @member {PowerSchoolStudent}
         */
        this.student = null;

        /**
         * The student's teachers.
         * @member {Array.<PowerSchoolTeacher>}
         */
        this.teachers = null;

        /**
         * The student's current year ID.
         * @member {number}
         */
        this.yearID = null;

        /**
         * The student's assignments.
         * @member {Array.<PowerSchoolAssignment>}
         */
        this.assignments = null;
    }
}

module.exports = PowerSchoolStudentInfo;