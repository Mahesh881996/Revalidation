var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as React from 'react';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import { getListItemById, ensureUser, createListItem, updateListItem } from '../../../Services/SPOps';
import "./Styles/Style.css";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import Swal from 'sweetalert2';
import { MessageBar, MessageBarType, } from '@fluentui/react';
import { stringIsNullOrEmpty } from '@pnp/common';
var requiredFields = ["userName", "lineManager", "quarter"];
var formValues;
var revalList = "Revalidation";
var ItemId = null;
var defaultUserName, defaultLineManager;
var ShowError = function (p) { return (React.createElement(MessageBar, { messageBarType: MessageBarType.error, isMultiline: false, onDismiss: p.resetChoice, dismissButtonAriaLabel: "Close" }, "Please fill all the required fields to Submit the Form")); };
var NewRevalForm = /** @class */ (function (_super) {
    __extends(NewRevalForm, _super);
    function NewRevalForm(props) {
        var _this = _super.call(this, props) || this;
        _this.createItem = function () { return __awaiter(_this, void 0, void 0, function () {
            var isFormValid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isFormValid = this.validateForm();
                        if (!isFormValid) return [3 /*break*/, 2];
                        this.setState({ showWarning: false });
                        return [4 /*yield*/, Swal.fire({
                                title: 'Are you sure?',
                                text: "To create the Item",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes',
                                backdrop: false,
                                allowOutsideClick: false
                            }).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!result.isConfirmed) return [3 /*break*/, 2];
                                            return [4 /*yield*/, createListItem(revalList, {
                                                    Title: this.state.quarter,
                                                    UserNameId: this.state.userName[0],
                                                    LineManagerId: this.state.lineManager[0],
                                                    RevalStstus: "Pending"
                                                }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, Swal.fire({
                                                                    icon: 'success',
                                                                    title: 'Created!',
                                                                    text: 'Your item has been created!',
                                                                    backdrop: false,
                                                                    allowOutsideClick: false
                                                                })];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, Swal.fire({
                                                icon: 'warning',
                                                title: 'Cancelled!',
                                                text: 'Your item is not Updated!',
                                                backdrop: false,
                                                allowOutsideClick: false
                                            })];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.setState({ showWarning: true });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.updateItem = function () { return __awaiter(_this, void 0, void 0, function () {
            var isFormValid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isFormValid = this.validateForm();
                        if (!isFormValid) return [3 /*break*/, 2];
                        this.setState({ showWarning: false });
                        return [4 /*yield*/, Swal.fire({
                                title: 'Are you sure?',
                                text: "To Update the Item",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes',
                                backdrop: false,
                                allowOutsideClick: false
                            }).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!result.isConfirmed) return [3 /*break*/, 2];
                                            debugger;
                                            return [4 /*yield*/, updateListItem(revalList, {
                                                    Title: this.state.quarter,
                                                    UserNameId: this.state.userName[0],
                                                    LineManagerId: this.state.lineManager[0]
                                                }, parseInt(ItemId)).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, Swal.fire({
                                                                    icon: 'success',
                                                                    title: 'Updated!',
                                                                    text: 'Your item has been Updated!',
                                                                    backdrop: false,
                                                                    allowOutsideClick: false
                                                                })];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, Swal.fire({
                                                icon: 'warning',
                                                title: 'Cancelled!',
                                                text: 'Your item is not Updated!',
                                                backdrop: false,
                                                allowOutsideClick: false
                                            })];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.setState({ showWarning: true });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.validateForm = function () {
            var isFormValid = false;
            formValues = _this.state;
            requiredFields.forEach(function (val, index) {
                if (!isFormValid && formValues[val] != null) {
                    isFormValid = true;
                }
                else {
                    isFormValid = false;
                }
            });
            return isFormValid;
        };
        _this.handleChange = function (evt, type, field) {
            var _a, _b, _c;
            if (type == "string") {
                var value = evt.target.value;
                _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[field] = value, _a)));
            }
            else if (type == "Person") {
                console.log(field);
                var getSelectedUsers_1 = [];
                evt.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ensureUser(item.id).then(function (data) {
                                    getSelectedUsers_1.push(data.data.Id);
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                _this.setState(__assign(__assign({}, _this.state), (_b = {}, _b[field] = getSelectedUsers_1, _b)));
            }
            else if (type == "file") {
                var resultFile = evt.target.files;
                var fileInfos_1 = [];
                for (var _i = 0, resultFile_1 = resultFile; _i < resultFile_1.length; _i++) {
                    var element = resultFile_1[_i];
                    var fileName = element.name;
                    var file = element;
                    var reader = new FileReader();
                    reader.onload = (function (file) {
                        return function (e) {
                            fileInfos_1.push({
                                "name": file.name,
                                "content": e.target.result
                            });
                        };
                    })(file);
                    reader.readAsArrayBuffer(file);
                }
                _this.setState(__assign(__assign({}, _this.state), (_c = {}, _c[field] = fileInfos_1, _c)));
            }
            console.log(_this.state);
        };
        _this.state = {
            userName: null,
            lineManager: null,
            quarter: null,
            required: ["userName", "lineManager", "quarter"],
            showWarning: false,
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.createItem = _this.createItem.bind(_this);
        _this.validateForm = _this.validateForm.bind(_this);
        _this.updateItem = _this.updateItem.bind(_this);
        return _this;
    }
    NewRevalForm.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = new URLSearchParams(window.location.search);
                        ItemId = queryParams.get('ItemId');
                        if (!(ItemId != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, getListItemById(revalList, "*,UserName/Name,UserName/EMail,LineManager/Name,LineManager/EMail", "UserName,LineManager", parseInt(ItemId)).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            defaultUserName = result.UserName.EMail;
                                            defaultLineManager = result.LineManager.EMail;
                                            this.setState({
                                                userName: result.UserName.EMail,
                                                lineManager: result.LineManager.EMail,
                                                quarter: result.Title,
                                            });
                                            return [4 /*yield*/, ensureUser(result.UserName.EMail).then(function (data) {
                                                    _this.setState({
                                                        userName: data.data.Id
                                                    });
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, ensureUser(result.UserName.EMail).then(function (data) {
                                                    _this.setState({
                                                        lineManager: data.data.Id
                                                    });
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    NewRevalForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, description = _a.description, isDarkTheme = _a.isDarkTheme, environmentMessage = _a.environmentMessage, hasTeamsContext = _a.hasTeamsContext, userDisplayName = _a.userDisplayName, context = _a.context;
        return (React.createElement("section", null,
            React.createElement(Container, null,
                React.createElement(Row, null,
                    React.createElement(Col, { md: 12 },
                        React.createElement("h2", { className: 'text-center' }, "Revalidation Form"))),
                React.createElement(Row, null, this.state.showWarning ? React.createElement(ShowError, null) : ""),
                React.createElement(Row, { className: "mt-1" },
                    React.createElement(Col, { md: 6 },
                        React.createElement(Form.Group, { controlId: "projectName" },
                            React.createElement(Row, null,
                                React.createElement(Col, { md: 4, className: "mt-2" },
                                    React.createElement(Form.Label, { className: "columnHeader required" }, "Quarter")),
                                React.createElement(Col, { md: 6, className: "align-self-center" },
                                    React.createElement(Form.Control, { size: "sm", type: "string", placeholder: "Enter Quarter", value: this.state.quarter, onChange: function (e) { return _this.handleChange(e, "string", "quarter"); } }))))),
                    React.createElement(Col, { md: 6 },
                        React.createElement(Form.Group, { controlId: "projectName" },
                            React.createElement(Row, null,
                                React.createElement(Col, { md: 4, className: "mt-2" },
                                    React.createElement(Form.Label, { className: "columnHeader required" }, "User Name")),
                                React.createElement(Col, { md: 6, className: "align-self-center" },
                                    React.createElement(PeoplePicker, { context: this.props.context, personSelectionLimit: 1, groupName: "", showtooltip: false, required: false, disabled: false, principalTypes: [PrincipalType.User], onChange: function (e) { return _this.handleChange(e, "Person", "userName"); }, defaultSelectedUsers: [defaultUserName], resolveDelay: 1000 }))))),
                    React.createElement(Col, { md: 6 },
                        React.createElement(Form.Group, { controlId: "projectName" },
                            React.createElement(Row, null,
                                React.createElement(Col, { md: 4, className: "mt-2" },
                                    React.createElement(Form.Label, { className: "columnHeader required" }, "Line Manager")),
                                React.createElement(Col, { md: 6, className: "align-self-center" },
                                    React.createElement(PeoplePicker, { context: this.props.context, personSelectionLimit: 1, groupName: "", showtooltip: true, required: false, disabled: false, principalTypes: [PrincipalType.User], onChange: function (e) { return _this.handleChange(e, "Person", "lineManager"); }, defaultSelectedUsers: [defaultLineManager], resolveDelay: 1000 })))))),
                React.createElement(Row, { className: "buttonContainer" },
                    stringIsNullOrEmpty(ItemId) ? React.createElement(Button, { variant: "primary", className: "mr-2", size: "sm", onClick: this.createItem }, "Create") : React.createElement(Button, { variant: "primary", className: "mr-2", size: "sm", onClick: this.updateItem }, "Update"),
                    React.createElement(Button, { variant: "danger", size: "sm" }, "Cancel")))));
    };
    return NewRevalForm;
}(React.Component));
export default NewRevalForm;
//# sourceMappingURL=NewRevalForm.js.map