var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// import pnp and pnp logging system
import { spfi, SPFx } from "@pnp/sp";
import { PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/sp/attachments";
import "@pnp/sp/lists/web";
import "@pnp/sp/site-users/web";
var _sp = null;
export var getSP = function (context) {
    if (_sp === null && context != null) {
        //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
        // The LogLevel set's at what level a message will be written to the console
        _sp = spfi().using(SPFx(context)).using(PnPLogging(2 /* Warning */));
    }
    return _sp;
};
export var createListItem = function (listName, body, files) { return __awaiter(void 0, void 0, void 0, function () {
    var spcontext, createdItem, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spcontext = getSP();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, spcontext.web.lists
                        .getByTitle(listName)
                        .items
                        .add(body).then(function (r) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!files) return [3 /*break*/, 2];
                                    return [4 /*yield*/, addAttachments(files, r.data.ID, listName)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                createdItem = _a.sent();
                return [2 /*return*/, createdItem];
            case 3:
                err_1 = _a.sent();
                Promise.reject(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var ensureUser = function (loginName) { return __awaiter(void 0, void 0, void 0, function () {
    var spcontext, userDetails, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spcontext = getSP();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, spcontext.web.ensureUser(loginName)];
            case 2:
                userDetails = _a.sent();
                return [2 /*return*/, userDetails];
            case 3:
                err_2 = _a.sent();
                Promise.reject(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var addAttachments = function (files, itemId, listName) { return __awaiter(void 0, void 0, void 0, function () {
    var spcontext, item, _a, batchedSP, execute;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                spcontext = getSP();
                return [4 /*yield*/, spcontext.web.lists.getByTitle(listName).items.getById(itemId)];
            case 1:
                item = _b.sent();
                _a = spcontext.batched(), batchedSP = _a[0], execute = _a[1];
                files.map(function (file) {
                    var files = item.attachmentFiles.add(file.name, file.content);
                });
                return [4 /*yield*/, execute()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
export var getListItems = function (listName, select, lookup) { return __awaiter(void 0, void 0, void 0, function () {
    var spcontext, allItems, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spcontext = getSP();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, spcontext.web.lists.getByTitle(listName).items.select(select).expand(lookup).top(5000)()];
            case 2:
                allItems = _a.sent();
                return [2 /*return*/, allItems];
            case 3:
                err_3 = _a.sent();
                Promise.reject(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=SPOps.js.map