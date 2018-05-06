/** 
 * A category for a PowerSchool assignment.
 * @hideconstructor
*/
class PowerSchoolAssignmentCategory {
    constructor(api, id, name, abbreviation, description, gradeBookType) {
        this.api = api;

        /**
         * The ID of this assignment.
         * @member {number}
         */
        this.id = id;

        /**
         * The name of this category.
         * @member {string}
         */
        this.name = name;

        /**
         * A shorter name for this category.
         * @member {string}
         */
        this.abbreviation = abbreviation;

        /**
         * A description of this category, if available.
         * @member {string}
         */
        this.description = description;

        /**
         * The grade book type for this assignment.
         * @member {number}
         */
        this.gradeBookType = gradeBookType;

        /**
         * The assignments in this category.
         * @member {Array.<PowerSchoolAssignment>}
         */
        this.assignments = [];
    }

    static fromData(data, api) {
        return new PowerSchoolAssignmentCategory(api, data.id, data.name, data.abbreviation, data.description, data.gradeBookType);
    }
}

module.exports = PowerSchoolAssignmentCategory;