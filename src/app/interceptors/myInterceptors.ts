import { FakeBackendInterceptor } from './fake-backend.interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

export const myInterceptors = [

    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true}
]