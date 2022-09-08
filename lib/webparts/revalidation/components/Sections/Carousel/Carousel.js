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
import { Carousel, Container } from "react-bootstrap";
import "../Carousel/Carousel.css";
import { uniq } from "lodash";
var CarouselComponent = /** @class */ (function (_super) {
    __extends(CarouselComponent, _super);
    function CarouselComponent(props) {
        return _super.call(this, props) || this;
    }
    CarouselComponent.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Container, { fluid: true },
                React.createElement(Carousel, { fade: true }, uniq(this.props.carouselData).map(function (data) { return (React.createElement(Carousel.Item, null,
                    React.createElement("img", { className: "full-width", src: "https://maheshofficelab.sharepoint.com/sites/Revalidation/Resources/Image1.jpg", alt: "First slide", height: "400" }),
                    React.createElement(Carousel.Caption, null,
                        React.createElement("h3", null, "First slide label"),
                        React.createElement("p", null, "Nulla vitae elit libero, a pharetra augue mollis interdum.")))); })))));
    };
    return CarouselComponent;
}(React.Component));
export default CarouselComponent;
//# sourceMappingURL=Carousel.js.map