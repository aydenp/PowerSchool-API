/** 
 * A PowerSchool event, such as a not in session day.
 * @hideconstructor
*/
class PowerSchoolEvent {
    constructor(api, id, type, date, description = null, schoolNumber = null) {
        this.api = api;
        
        /**
         * The ID of this event.
         * @member {number}
         */
        this.id = id;

        /**
         * The type of this event to group together with others.
         * @member {string}
         */
        this.type = type;

        /**
         * The date of this event.
         * @member {Date}
         */
        this.date = date;

        /**
         * The description for this event.
         * @member {string}
         */
        this.description = description;

        /**
         * The number of the school this event is from.
         * @member {number}
         */
        this.schoolNumber = schoolNumber;
    }

    static fromData(data, api) {
        return new PowerSchoolEvent(api, data.id, data.calType, new Date(data.calendarDay), data.description, data.schoolNumber);
    }

    /**
     * Get the school this event is from.
     * @return {PowerSchoolSchool}
     */
    getSchool() {
        return this.api._cachedInfo.schools[this.schoolNumber];
    }
}

module.exports = PowerSchoolEvent;