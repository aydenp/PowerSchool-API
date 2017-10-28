/**
 * A object meant for holding basic information about a student.
 * @hideconstructor
 */
class PowerSchoolStudent {
    constructor(api, id, firstName, middleName, lastName, dateOfBirth, ethnicity, gender, gradeLevel, currentGPA, currentTerm, photoDate = null, currentMealBalance = 0, startingMealBalance = 0) {
        this.api = api;

        /**
         * The student's ID.
         * @member {number}
         */
        this.id = id;

        /**
         * The student's first/given name.
         * @member {string}
         */
        this.firstName = firstName;

        /**
         * The student's middle name.
         * @member {string}
         */
        this.middleName = middleName;

        /**
         * The student's last name/surname.
         * @member {string}
         */
        this.lastName = lastName;

        /**
         * The student's date of birth.
         * @member {Date}
         */
        this.dateOfBirth = dateOfBirth;

        /**
         * The student's ethnicity (can be one of many things determined by the school itself).
         * @member {string}
         */
        this.ethnicity = ethnicity;

        /**
         * The student's gender (can be one of many things determined by the school itself).
         * @member {string}
         */
        this.gender = gender;
        
        /**
         * The grade the student is currently in.
         * @member {number}
         */
        this.gradeLevel = gradeLevel;

        /**
         * The student's current GPA, if grades are available (null if not).
         * @member {number}
         */
        this.currentGPA = currentGPA;

        /**
         * The student's current term, if available (null if not).
         * @member {number}
         */
        this.currentTerm = currentTerm;

        /**
         * The date the student's photo was taken on.
         * @member {Date}
         */
        this.photoDate = photoDate;

        /**
         * The student's current meal balance, if supported.
         * @member {number}
         */
        this.currentMealBalance = currentMealBalance;
        
        /**
         * The student's starting meal balance, if supported.
         * @member {number}
         */
        this.startingMealBalance = startingMealBalance;
    }

    static fromData(data, api) {
        return new PowerSchoolStudent(api, data.id, data.firstName, data.middleName, data.lastName, new Date(data.dob), data.ethnicity, data.gender, data.gradeLevel, data.currentGPA || null, data.currentTerm, data.photoDate ? new Date(data.photoDate) : null, data.currentMealBalance, data.startingMealBalance);
    }
    
    /**
     * Get the parts making up a student's name.
     * @param {boolean} [includeMiddleName] - Whether or not to include the student's middle name.
     * @return {Array.<string>}
     */
    getNameParts(includeMiddleName = false) {
        if(includeMiddleName && this.middleName && this.middleName.length > 0) return [this.firstName, this.middleName, this.lastName];
        return [this.firstName, this.lastName];
    }

    /**
     * Get student's name formatted for display.
     * @param {boolean} [includeMiddleName] - Whether or not to include the student's middle name.
     * @return {string}
     */
    getFormattedName(includeMiddleName = false) {
        return this.getNameParts(includeMiddleName).join(" ");
    }

    /**
     * Get the current reporting term the student is in.
     * @return {PowerSchoolReportingTerm}
     */
    getCurrentReportingTerm() {
        // Why did they make this a title instead of ID?
        return this.api._cachedInfo.reportingTerms.find((term) => term.title == this.currentTerm);
    }
}

module.exports = PowerSchoolStudent;