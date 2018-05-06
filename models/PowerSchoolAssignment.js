/** 
 * A PowerSchool assignment.
 * @hideconstructor
*/
class PowerSchoolAssignment {
    constructor(api, id, assignmentID, name, abbreviation, categoryID, courseID, description, dueDate, gradeBookType, weight, includeInFinalGrades, publishScores, scorePublishDate) {
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
         * The name of this assignment.
         * @member {string}
         */
        this.name = name;

        /**
         * A shorter name for this assignment.
         * @member {string}
         */
        this.abbreviation = abbreviation;

        /**
         * The category this assignment belongs to.
         * @member {number}
         */
        this.categoryID = categoryID;

        /**
         * The course this assignment belongs to.
         * @member {number}
         */
        this.courseID = courseID;

        /**
         * The description of this assignment, if available.
         * @member {string}
         */
        this.description = description;
        
        /**
         * The due date of this assignment.
         * @member {Date}
         */
        this.dueDate = dueDate;

        /**
         * The grade book type for this assignment.
         * @member {number}
         */
        this.gradeBookType = gradeBookType;
        
        /**
         * The weight this assignment carries on the overall course mark.
         * @member {number}
         */
        this.weight = weight;

        /**
         * Whether or not this assignment's mark will influence the final grade in this course.
         * @member {string}
         */
        this.includeInFinalGrades = includeInFinalGrades;

        /**
         * Whether scores for this assignment will be published or not.
         * @member {boolean}
         */
        this.publishScores = publishScores;

        /**
         * The specific date scores for this assignment will be published, if available.
         * @member {Date}
         */
        this.scorePublishDate = scorePublishDate;
    }

    static fromData(data, api) {
        return new PowerSchoolAssignment(api, data.id, data.assignmentid, data.name, data.abbreviation, data.categoryId, data.sectionid, data.description, new Date(data.dueDate), data.gradeBookType, data.weight, data.includeinfinalgrades == 1, data.publishscores == 1, data.scorePublishDate ? new Date(data.scorePublishDate) : null);
    }

    /**
     * Get the score received on this assignment, if available.
     * @return {PowerSchoolAssignmentScore}
     */
    getScore() {
        return this.api._cachedInfo.assignmentScores[this.id];
    }

    /**
     * Get the category this assigmment belongs to.
     * @return {PowerSchoolAssignmentCategory}
     */
    getCategory() {
        return this.api._cachedInfo.assignmentCategories[this.categoryID];
    }

    /**
     * Get the course this assigmment belongs to.
     * @return {PowerSchoolCourse}
     */
    getCourse() {
        return this.api._cachedInfo.courses[this.courseID];
    }
}

module.exports = PowerSchoolAssignment;