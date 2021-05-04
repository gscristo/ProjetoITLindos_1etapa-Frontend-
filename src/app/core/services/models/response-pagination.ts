import { PaginationResult } from "./pagination-result"

export class ResponsePagination<T> {
    content: PaginationResult<T>;
    message: string;
    statusCode: number;
}
