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
const tweeter_shared_1 = require("tweeter-shared");
const StatusService_1 = require("../model/service/StatusService");
const FieldVerifier_1 = require("./FieldVerifier");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    //todo eventually, you will put something in service that verifies the authToken.
    (0, FieldVerifier_1.verifyFields)(['user', 'pageSize', 'lastItem'], event);
    event = tweeter_shared_1.requestParser.getStatusList(event);
    let statusService = new StatusService_1.StatusService();
    let [statuses, hasMore] = yield statusService.loadMoreFeed(tweeter_shared_1.FakeData.instance.authToken, event.user, event.pageSize, event.lastItem);
    return { statuses: statuses, hasMore: hasMore, success: true, message: null };
});
exports.handler = handler;
