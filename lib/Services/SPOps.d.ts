import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/sp/attachments";
import "@pnp/sp/lists/web";
import "@pnp/sp/site-users/web";
import { IAttachmentFileInfo } from "@pnp/sp/attachments";
export declare const getSP: (context?: WebPartContext) => SPFI;
export declare const addAttachments: (files: IAttachmentFileInfo[], itemId: number, listName: string) => Promise<void>;
export declare const createListItem: (listName: string, body: any, files?: IAttachmentFileInfo[]) => Promise<void>;
export declare const updateListItem: (listName: string, body: any, itemId: number, files?: IAttachmentFileInfo[]) => Promise<void>;
export declare const ensureUser: (loginName: string) => Promise<import("@pnp/sp/site-users/types").IWebEnsureUserResult>;
export declare const getListItems: (listName: string, select: string, lookup: string) => Promise<any[]>;
export declare const getListItemById: (listName: string, select: string, lookup: string, itemId: number) => Promise<any>;
//# sourceMappingURL=SPOps.d.ts.map