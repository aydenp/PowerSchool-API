/** 
 * A PowerSchool teacher object.
 * @hideconstructor
*/
class PowerSchoolTeacher {
    constructor(id, firstName, lastName, email, schoolPhone) {
        /**
         * The ID of this teacher.
         * @member {number}
         */
        this.id = id;

        /**
         * The first name of this teacher.
         * @member {string}
         */
        this.firstName = firstName;

        /**
         * The last name of this teacher.
         * @member {string}
         */
        this.lastName = lastName;

        /**
         * The email of this teacher, if provided.
         * @member {string}
         */
        this.email = email;

        /**
         * The phone of this teacher's school, if provided.
         * @member {string}
         */
        this.schoolPhone = schoolPhone;
    }
    
    static fromData(data) {
        return new PowerSchoolTeacher(data.id, data.firstName, data.lastName, data.email, data.schoolPhone);
    }

    /**
     * Get the parts making up a teacher's name.
     * @return {Array.<string>}
     */
    getNameParts(includeMiddleName = false) {
        return [this.firstName, this.lastName];
    }

    /**
     * Get teacher's name formatted for display.
     * @return {string}
     */
    getFormattedName(includeMiddleName = false) {
        return this.getNameParts().join(" ");
    }
}

module.exports = PowerSchoolTeacher;