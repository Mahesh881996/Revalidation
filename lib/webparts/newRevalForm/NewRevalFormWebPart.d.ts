import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/commonStyles.css";
import "@pnp/sp/webs";
import "@pnp/sp/profiles";
export interface INewRevalFormWebPartProps {
    description: string;
}
export default class NewRevalFormWebPart extends BaseClientSideWebPart<INewRevalFormWebPartProps> {
    private _isDarkTheme;
    private _environmentMessage;
    render(): void;
    protected onInit(): Promise<void>;
    private _getEnvironmentMessage;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=NewRevalFormWebPart.d.ts.map