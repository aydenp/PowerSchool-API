/** 
 * A PowerSchool school information object.
 * @hideconstructor
*/
class PowerSchoolSchool {
    constructor(api, id, name, schoolNumber, formattedAddress, addressParts, phone, fax, lowGrade, highGrade, disabled, disabledMessage, disabledFeatures, abbreviation) {
        this.api = api;

        /**
         * The ID of this school.
         * @member {number}
         */
        this.id = id;
        
        /**
         * The name of this school.
         * @member {string}
         */
        this.name = name;
    
        /**
         * The number of this school.
         * @member {number}
         */
        this.schoolNumber = schoolNumber;

        /**
         * The school's address, formatted for display.
         * @member {string}
         */
        this.formattedAddress = formattedAddress;

        /**
         * The part's making up the school's address (such as street address, city, state/province, country, ZIP/postal code).
         * @member {object}
         */
        this.addressParts = addressParts;

        /**
         * The school's phone number, formatted for display.
         * @member {string}
         */
        this.phone = phone;

        /**
         * The school's fax number, formatted for display.
         * @member {string}
         */
        this.fax = fax;

        /**
         * The lowest grade this school has.
         * @member {number}
         */
        this.lowGrade = lowGrade;

        /**
         * The highest grade this school has.
         * @member {number}
         */
        this.highGrade = highGrade;

        /**
         * Whether or not the school is currently disabled.
         * @member {boolean}
         */
        this.disabled = disabled;

        /**
         * Optional messages to display for the school if it is disabled (title and message keys in the object).
         * @member {object}
         */
        this.disabledMessage = disabledMessage;

        /**
         * Features that are disabled on the school (object with true or false, on disabled status of each key).
         * @member {object}
         */
        this.disabledFeatures = disabledFeatures;

        /**
         * The abbreviation for the school.
         * @member {object}
         */
        this.abbreviation = abbreviation;
    }

    static fromData(data, api) {
        return new PowerSchoolSchool(api, data.schoolId, data.name, data.schoolNumber, data.address, { streetAddress: data.schooladdress, city: data.schoolcity, state: data.schoolstate, country: data.schoolcountry, zip: data.schoolzip }, data.schoolphone, data.schoolfax, data.lowGrade, data.highGrade, data.schoolDisabled, data.schoolDisabledTitle || data.schoolDisabledMessage ? { title: data.schoolDisabledTitle, message: data.schoolDisabledMessage } : null, data.disabledFeatures, data.abbreviation);
    }

    /**
     * Get the attendance codes that belong to this school.
     * @return {PowerSchoolAttendanceCode}
     */
    getAttendanceCodes() {
        return Object.values(this.api._cachedInfo.attendanceCodes).filter((c) => c.schoolNumber == this.schoolNumber);
    }
}

module.exports = PowerSchoolSchool;