import type {MoneyRecord, MoneyRecordParam} from "./model";
import type {PageResult} from "~/api";

/**
 * 分页查询订单
 */
export async function pageMoneyRecords(params: MoneyRecordParam) {
    const res = await request.get<PageResult<MoneyRecord>>(
        '/income/money-record/page',
        { ...params }, { server: false }
    );
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}