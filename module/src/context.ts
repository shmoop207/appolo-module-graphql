import {define, App, IRequest, IResponse, Injector} from 'appolo';

@define()
export class Context {
    constructor(private _req: IRequest, private _res: IResponse, private _app: App) {

    }

    public get app(): App {
        return this._app;
    }

    public get injector(): Injector {
        return this._app.injector;
    }

    public get req(): IRequest {
        return this._req;
    }

    public get res(): IResponse {
        return this._res;
    }
}
