export class BaseResponse<T> {
    success: boolean;
    errorMessage?: string;
    errorCode?: string;
    data: T;
}

export class SuccessResponse<T> extends BaseResponse<T> {
    /**
     *
     */
    constructor(data: T) {
        super();

        this.data = data;
        this.success = true;
        this.errorCode = '';
        this.errorMessage = '';
    }
}

export class FailedResponse<T> extends BaseResponse<T> {
    /**
     *
     */
     constructor(errorCode = '', errorMessage = '') {
        super();

        this.data = undefined;
        this.success = false;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
