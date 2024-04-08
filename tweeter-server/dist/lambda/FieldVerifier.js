"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFields = void 0;
//verifies that the object passed has the expected fields, plus authToken if authTokenRequired is true
function verifyFields(expectedFields, request, authTokenRequired = true) {
    let keys = Object.keys(request);
    if (authTokenRequired)
        expectedFields.push('authToken');
    if (keys.length != expectedFields.length)
        throw new Error(`[Bad Request] The request is expected to have ${expectedFields.length} fields, ${keys.length} were provided. \nExpected: ${expectedFields}\nFound: ${keys}`);
    for (let expectedField of expectedFields) {
        if (!keys.includes(expectedField)) {
            throw new Error(`[Bad Request] The request is missing field ${expectedField}, and possibly other fields, despite having the correct number of fields. \nExpected: ${expectedFields}\nFound: ${keys}`);
        }
    }
}
exports.verifyFields = verifyFields;
