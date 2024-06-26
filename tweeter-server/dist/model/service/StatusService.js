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
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class StatusService {
    loadMoreFeed(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            return tweeter_shared_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
        });
    }
    loadMoreStory(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            return tweeter_shared_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
        });
    }
    postStatus(authToken, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pause so we can see the logging out message. Remove when connected to the server
            yield new Promise((f) => setTimeout(f, 2000));
            // TODO: Call the server to post the status
        });
    }
}
exports.StatusService = StatusService;
