"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatEntityValidation = void 0;
class ChatEntityValidation {
    constructor(params) {
        this.entity = this.validate(params);
    }
    validate(params) {
        if (!params.message) {
            throw new Error("Message is required!");
        }
        if (!params.userName) {
            throw new Error("Username is required!");
        }
        if (params.userName.length <= 10) {
            throw new Error('The username length should be greater than of 10 characters.');
        }
        if (!params.location) {
            throw new Error('Location is required!');
        }
        if (!params.location.coordinates) {
            throw new Error('Coordinates is required!');
        }
        if (!Array.isArray(params.location.coordinates)) {
            throw new Error('Coordinates should be one array!');
        }
        if (params.location.coordinates.length < 2) {
            throw new Error('Lat and long are required!');
        }
        const capitalizedUserName = params.userName.charAt(0).toUpperCase() + params.userName.slice(1);
        params.userName = capitalizedUserName;
        return params;
    }
    get() {
        return this.entity;
    }
}
exports.ChatEntityValidation = ChatEntityValidation;
