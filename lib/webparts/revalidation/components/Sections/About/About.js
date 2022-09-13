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
import * as React from "react";
import { Container } from "react-bootstrap";
var About = /** @class */ (function (_super) {
    __extends(About, _super);
    function About(props) {
        return _super.call(this, props) || this;
    }
    About.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Container, { fluid: true },
                React.createElement("h3", null, "About Section"))));
    };
    return About;
}(React.Component));
export default About;
//# sourceMappingURL=About.js.map