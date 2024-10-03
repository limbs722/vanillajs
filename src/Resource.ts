import { apiGetImages } from './api';
import Wire from './lib/Wire';
import type { ImageType } from './Types';

const wire = Wire.instance;
const EVENT_NAME = 'image_loading';

class Container {
    pool: ImageType[] = [];
    currentImages: ImageType[] = [];
    isFetching: boolean = false;

    constructor() {
        this.currentImages = [];
    }

    init(data: ImageType[]) {
        this.pool = [];

        if (data) {
            for (const item of data) {
                this.pool.push(item);
            }
        }
    }

    focus() {
        this.currentImages = this.pool;

        wire.fire(EVENT_NAME + ':focus');
    }

    except(message: string) {
        alert(message);
    }

    async fetch(query?: string) {
        if (this.pool !== null) {
            wire.fire(EVENT_NAME + ':fetched');
        }

        await apiGetImages({ query })
            .then((response) => {
                this.init(response);
                this.currentImages = response;
                wire.fire(EVENT_NAME + ':fetched');
            })
            .catch(() => wire.fire(EVENT_NAME + ':fetched', false));
    }

    // createProject(projectName: string) {
    //     apiPostProject(user.userInfo.email, projectName)
    //         .then((r) => r.json())
    //         .then((r) => {
    //             if (r.code != ResponseDataConst.SUCCESS_CREATE) {
    //                 return this.except('프로젝트 생성 실패');
    //             }

    //             if (this.pool == undefined) {
    //                 this.pool = [];
    //             }
    //             this.pool.push(
    //                 new Record({
    //                     id: r.data.create_project_id,
    //                     name: projectName,
    //                     device_auth: null,
    //                     calendar_apps: { google: null },
    //                 }),
    //             );

    //             this.focus(this.pool.length - 1);
    //         });

    //     return true;
    // }

    // async deleteProject(projectId: number, addToast: AddToastType) {
    //     return await apiDeleteProject(user.userInfo.email, projectId)
    //         .then((r) => r.json())
    //         .then((r) => {
    //             if (r.code != ResponseDataConst.SUCCESS_DELETE) {
    //                 throw Error('프로젝트 삭제 실패');
    //             }

    //             const fidx = this.pool.findIndex(
    //                 (item) => item.id == projectId,
    //             );
    //             this.pool.splice(fidx, 1);
    //             this.focus(this.pool.length - 1);
    //             press.wire.fire(EVENT_NAME + ':refresh');

    //             return this.pool.length;
    //         });
    // }

    // updateProject(
    //     projectId: number,
    //     projectName: string,
    //     addToast: AddToastType,
    // ) {
    //     apiPutProject()
    //         .then((r) => r.json())
    //         .then((r) => {
    //             if (r.code !== ResponseDataConst.SUCCESS_UPDATE) {
    //                 return this.except('프로젝트 업데이트 실패');
    //             }
    //             const project = this.pool.find((item) => item.id == projectId);
    //             project.name = projectName;

    //             press.wire.fire(EVENT_NAME + ':refresh');
    //             addToast(
    //                 { type: 'success', message: '저장이 완료되었습니다.' },
    //                 3000,
    //             );
    //         })
    //         .catch((msg) => {
    //             addToast({ type: 'fail', message: msg }, 3000);
    //         });
    // }
}

class Resource {
    private static _instance: Resource;

    public static get instance() {
        return this._instance || (this._instance = new Resource());
    }

    _container: Container | undefined;
    public get container() {
        return this._container || (this._container = new Container());
    }

    public get isFetching() {
        return this.container.isFetching;
    }

    public set isFetching(status: boolean) {
        this.container.isFetching = status;
    }

    public get images() {
        const _p = this.container.pool;
        if (!_p) return [];

        if (_p.length > 0) {
            return this.container.pool.map((item) => {
                return {
                    id: item.id,
                    url: item.url,
                    width: item.width,
                    height: item.height,
                };
            });
        } else {
            return [];
        }
    }

    public get currImages() {
        return this.container.currentImages;
    }
}

export default Resource.instance;
