/** 
 * The score received for a PowerSchool assignment.
 * @hideconstructor
*/
class PowerSchoolAssignmentScore {
    constructor(api, id, assignmentID, collected, late, missing, exempt, gradeBookType, comment, score, letterGrade, percentage, scoreType) {
        this.api = api;

        /**
         * The ID of this assignment.
         * @member {number}
         */
        this.id = id;

        /**
         * The secondary ID of this assignment in the system.
         * @member {number}
         */
        this.assignmentID = assignmentID;

        /**
         * Whether or not this assignment has been collected yet.
         * @member {boolean}
         */
        this.collected = collected;

        /**
         * Whether or not this assignment is late.
         * @member {boolean}
         */
        this.late = late;

        /**
         * Whether or not this assignment is missing.
         * @member {boolean}
         */
        this.missing = missing;

        /**
         * Whether or not the student is exempt from completing this assignment.
         * @member {boolean}
         */
        this.exempt = exempt;
        
        /**
         * The grade book type for this assignment.
         * @member {number}
         */
        this.gradeBookType = gradeBookType;
        
        /**
         * The teacher's comment on this assignment, if available.
         * @member {string}
         */
        this.comment = comment;

        /**
         * The score received on this assignment.
         * @member {string}
         */
        this.score = score;

        /**
         * The score received on this assignment (as a percentage value from 0-1), if able to calculate.
         * @member {number}
         */
        this.percentage = percentage;

        /**
         * The letter grade received on this assignment (can be any string used for display of score).
         * @member {string}
         */
        this.letterGrade = letterGrade;
        
        /**
         * The scoring type used on this assignment.
         * @member {number}
         */
        this.scoreType = scoreType;
    }

    static fromData(data, api) {
        // Calculate floating percentage from the odd string given
        var percentage = Number.parseFloat(data.percent);
        if (Number.isNaN(percentage)) percentage = null;
        if (percentage !== null) percentage /= 100;

        return new PowerSchoolAssignmentScore(api, data.id, data.assignmentId, data.collected, data.late, data.missing, data.exempt, data.gradeBookType, data.comment, data.score, data.letterGrade, percentage, data.scoretype);
    }

    /**
     * Get the assignment this score was received on.
     * @return {PowerSchoolAssignment}
     */
    getAssignment() {
        return this.api._cachedInfo.assignments[this.assignmentID];
    }
}

module.exports = PowerSchoolAssignmentScore;