"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const UserService_1 = require("../model/service/UserService");
const FieldVerifier_1 = require("./FieldVerifier");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    (0, FieldVerifier_1.verifyFields)(['firstName', 'lastName', 'alias', 'password', 'imageStringBase64'], event, false);
    let userService = new UserService_1.UserService();
    let [user, authToken] = yield userService.register(event.firstName, event.lastName, event.alias, event.password, event.imageStringBase64);
    return { user: user, token: authToken, success: true, message: null };
});
exports.handler = handler;
