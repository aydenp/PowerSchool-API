const PowerSchoolEvent = require("./PowerSchoolEvent");
const PowerSchoolTerm = require("./PowerSchoolTerm");
const PowerSchoolPeriod = require("./PowerSchoolPeriod");
const PowerSchoolReportingTerm = require("./PowerSchoolReportingTerm");
const PowerSchoolCourse = require("./PowerSchoolCourse");
const PowerSchoolStudent = require("./PowerSchoolStudent");
const PowerSchoolStudentInfo = require("./PowerSchoolStudentInfo");
const PowerSchoolSchool = require("./PowerSchoolSchool");
const PowerSchoolTeacher = require("./PowerSchoolTeacher");
const PowerSchoolAssignment = require("./PowerSchoolAssignment");
const PowerSchoolAssignmentScore = require("./PowerSchoolAssignmentScore");
const PowerSchoolAssignmentCategory = require("./PowerSchoolAssignmentCategory");
const PowerSchoolAttendanceRecord = require("./PowerSchoolAttendanceRecord");
const PowerSchoolAttendanceCode = require("./PowerSchoolAttendanceCode");
const PowerSchoolFinalGrade = require("./PowerSchoolFinalGrade");

/** 
 * A PowerSchool API user, which holds information about the user and methods to interact with them.
 * @hideconstructor
*/
class PowerSchoolUser {
    constructor(session, api) {
        this.session = session;
        if(this.session.serverCurrentTime) {
            // For some reason it provides it in a different format than it provides (wants ISO 8601)
            this.session.serverCurrentTime = new Date(this.session.serverCurrentTime).toISOString();
        }
        this.api = api;
        this._initUserVariables();
    }

    _initUserVariables() {
        this.userID = this.session.userId;
        this.userType = this.session.userType;
        // We need to fetch these separately
        this.studentData = [];
        this.rawResult = null;
    }

    /**
     * Get information about this account's student(s).
     * @return {Promise.<PowerSchoolStudentInfo[], Error>} A promise that resolves with the account's students information, and rejects with an Error if one occurred.
     */
    getStudentsInfo() {
        return new Promise((resolve, reject) => {
            var data = {
                userSessionVO: {
                    userId: this.userID,
                    serviceTicket: this.session.serviceTicket,
                    serverInfo: {
                        apiVersion: this.session.serverInfo.apiVersion
                    },
                    serverCurrentTime: this.session.serverCurrentTime,
                    userType: this.userType
                },
                studentIDs: this.session.studentIDs,
                qil: {
                    includes: "1"
                }
            }
            this.api.client.getStudentData(data, this.api.requestOptions, (err, result) => {
                if (!result || !result.return || !result.return.studentDataVOs) return reject(err);
                this.rawResult = result;
                this.studentData = this._parseStudentInfoResult(result);
                resolve(this.studentData);
            });
        });
    }

    _parseStudentInfoResult(result) {
        var parsed = [];
        var studentsData = this.safelyParseUnpredictableArray(result.return.studentDataVOs);

        studentsData.forEach((data) => {
            var studentData = new PowerSchoolStudentInfo();

            // Deserialize any data we might need for special types
            var schools = this.safelyParseUnpredictableArray(data.schools).map((data) => PowerSchoolSchool.fromData(data, this.api)); // for some reason sometimes is an array, sometimes is one school.
            var teachers = this.safelyParseUnpredictableArray(data.teachers).map((data) => PowerSchoolTeacher.fromData(data));
            var terms = this.safelyParseUnpredictableArray(data.terms).map((data) => PowerSchoolTerm.fromData(data, this.api));
            var reportingTerms = this.safelyParseUnpredictableArray(data.reportingTerms).map((data) => PowerSchoolReportingTerm.fromData(data, this.api));
            var assignments = this.safelyParseUnpredictableArray(data.assignments).map((data) => PowerSchoolAssignment.fromData(data, this.api));
            var assignmentScores = this.safelyParseUnpredictableArray(data.assignmentScores).map((data) => PowerSchoolAssignmentScore.fromData(data, this.api));
            var attendanceCodes = this.safelyParseUnpredictableArray(data.attendanceCodes).map((data) => PowerSchoolAttendanceCode.fromData(data, this.api));
            var periods = this.safelyParseUnpredictableArray(data.periods).map((data) => PowerSchoolPeriod.fromData(data, this.api));
            var courses = this.safelyParseUnpredictableArray(data.sections).map((data) => PowerSchoolCourse.fromData(data, this.api));
            var finalGrades = this.safelyParseUnpredictableArray(data.finalGrades).map((data) => PowerSchoolFinalGrade.fromData(data, this.api));

            // Add assignments to their categories
            var assignmentCategories = {};
            this.safelyParseUnpredictableArray(data.assignmentCategories).forEach((data) => assignmentCategories[data.id] = PowerSchoolAssignmentCategory.fromData(data, this.api));
            assignments.filter((a) => assignmentCategories[a.categoryID]).forEach((a) => assignmentCategories[a.categoryID].assignments.push(a));

            // Store information needed for other data mappings
            this.api.storeCacheInfo(teachers, "teachers");
            this.api.storeCacheInfo(schools, "schools", "schoolNumber");
            this.api.storeCacheInfo(periods, "periods");
            this.api.storeCacheInfo(courses, "courses");
            this.api.storeCacheInfo(finalGrades, "finalGrades", "courseID");
            this.api.storeCacheInfo(terms, "terms");
            this.api.storeCacheInfo(reportingTerms, "reportingTerms");
            this.api.storeCacheInfo(Object.values(assignmentCategories), "assignmentCategories");
            this.api.storeCacheInfo(assignments, "assignments");
            this.api.storeCacheInfo(assignmentScores, "assignmentScores", "assignmentID");
            this.api.storeCacheInfo(attendanceCodes, "attendanceCodes");

            // Store the rest of the data for use in the student model
            studentData.schools = schools;
            studentData.teachers = teachers;
            studentData.periods = periods;
            studentData.courses = courses;
            studentData.terms = terms;
            studentData.reportingTerms = reportingTerms;
            studentData.notInSessionDays = this.safelyParseUnpredictableArray(data.notInSessionDays).map((data) => PowerSchoolEvent.fromData(data, this.api));
            studentData.student = PowerSchoolStudent.fromData(data.student, this.api);
            studentData.yearID = data.yearId;
            studentData.assignmentCategories = Object.values(assignmentCategories);
            studentData.attendanceRecords = this.safelyParseUnpredictableArray(data.attendance).map((data) => PowerSchoolAttendanceRecord.fromData(data, this.api));
            studentData.attendanceCodes = attendanceCodes;
            studentData.finalGrades = finalGrades;

            parsed.push(studentData);
        });

        return parsed;
    }
    
    safelyParseUnpredictableArray(arr) {
        if (!arr) return [];
        if (Array.isArray(arr)) return arr;
        return [arr];
    }

    /**
     * Get the information about the first student on the account.
     * 
     * @deprecated Use `getStudentInfo()` to better support multi-user accounts.
     * @return {Promise.<PowerSchoolStudentInfo, Error>} A promise that resolves with the user's student info, and rejects with an Error if one occurred.
     */
    async getStudentInfo() {
        return (await this.getStudentsInfo())[0];
    }
}

module.exports = PowerSchoolUser;
