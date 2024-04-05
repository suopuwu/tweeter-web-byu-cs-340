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
exports.UserService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class UserService {
    login(alias, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling the server
            let user = tweeter_shared_1.FakeData.instance.firstUser;
            if (user === null) {
                throw new Error('Invalid alias or password');
            }
            return [user, tweeter_shared_1.FakeData.instance.authToken];
        });
    }
    register(firstName, lastName, alias, password, userImageBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            // Not neded now, but will be needed when you make the request to the server in milestone 3
            let imageStringBase64 = Buffer.from(userImageBytes).toString('base64');
            // TODO: Replace with the result of calling the server
            let user = tweeter_shared_1.FakeData.instance.firstUser;
            if (user === null) {
                throw new Error('Invalid registration');
            }
            return [user, tweeter_shared_1.FakeData.instance.authToken];
        });
    }
    findUserByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            //todo make throw if not found
            return tweeter_shared_1.FakeData.instance.findUserByAlias(alias);
        });
    }
    getIsFollowerStatus(authToken, userAlias, selectedUserAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.isFollower();
        });
    }
    getFolloweesCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.getFolloweesCount(user);
        });
    }
    getFollowersCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.getFollowersCount(user);
        });
    }
    //todo create follow and unfollow functions
    logout(authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pause so we can see the logging out message. Delete when the call to the server is implemented.
            yield new Promise((res) => setTimeout(res, 1000));
        });
    }
}
exports.UserService = UserService;
