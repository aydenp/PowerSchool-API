const soap = require("strong-soap").soap;
const PowerSchoolUser = require("./models/PowerSchoolUser");

/** The main PowerSchool API wrapper, for logging into user accounts and caching of retrieved info. */
class PowerSchoolAPI {
    /**
     * Create an API wrapper.
     * @param {string} url - The main URL of the PowerSchool installation, such as "http://sales.powerschool.com".
     * @param {string} [apiUsername] - The API username to use for logging in, if your installation has a different one. For most installations, the default provided value should work.
     * @param {string} [apiPassword] - The API password to use for logging in, if your installation has a different one. For most installations, the default provided value should work.
     */
    constructor(url, apiUsername = "pearson", apiPassword = "m0bApP5") {
        this.url = url;
        this.apiUsername = apiUsername;
        this.apiPassword = apiPassword;
        this.ready = false;
        this.errored = false;
        this.requestOptions = { auth: { user: apiUsername, pass: apiPassword, sendImmediately: false } };
        this._cachedInfo = {};
    }

    /**
     * Setup the API wrapper for usage (required for any interaction).
     * @return {Promise.<PowerSchoolAPI, Error>} - A promise that returns the API again if resolved, or an Error if rejected. 
     */
    setup() {
        const publicPortalServiceURL = this.url + "/pearson-rest/services/PublicPortalServiceJSON";
        return new Promise((resolve, reject) => {
            soap.createClient(publicPortalServiceURL + "?wsdl", { wsdl_options: this.requestOptions }, (err, client) => {
                if(!client) {
                    this.errored = true;
                    return reject(err);
                }
                this.ready = true;
                client.setEndpoint(publicPortalServiceURL);
                this.client = client;
                resolve(this);
            });
        })
    }
    /**
     * Log into a user's account and get their user object.
     * @param {string} username - The username of the account to log in to.
     * @param {string} password - The password of the account to log in to.
     * @return {Promise.<PowerSchoolUser, Error>} - A promise that resolves with the user if login was successful, resolves to null if invalid credentials were provided, and rejects with an Error if another error occurred during login.
     */
    login(username, password) {
        return new Promise((resolve, reject) => {
            if(!this.ready) reject(null);
            this.client.loginToPublicPortal({username: username, password: password}, this.requestOptions, (err, result) => {
                if(!result || !result.return) return reject(err);
                if(!result.return.userSessionVO) return resolve(null);
                var user = new PowerSchoolUser(result.return.userSessionVO, this);
                resolve(user);
            });
        });
    }

    // - Cached Info

    storeCacheInfo(dataArray, dataType, idKey = "id") {
        if(!Array.isArray(dataArray)) dataArray = [dataArray];
        if(!this._cachedInfo[dataType]) this._cachedInfo[dataType] = {};
        dataArray.forEach((item) => this._cachedInfo[dataType][item[idKey]] = item);
    }
}

module.exports = PowerSchoolAPI;