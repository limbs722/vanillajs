export default class Wire {
    private static _instance: Wire;
    public static get instance() {
        return this._instance || (this._instance = new Wire());
    }

    //prevent using new Constructor();
    private constructor() {}

    fire(etag, shout = null): void {
        document.getElementById('app')?.dispatchEvent(
            new CustomEvent('re' + etag, {
                detail: { what: shout },
                bubbles: true,
            }),
        );
    }
}
