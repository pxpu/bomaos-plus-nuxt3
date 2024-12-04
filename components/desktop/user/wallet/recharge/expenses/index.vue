<template>
  <n-data-table
      remote
      size="large"
      ref="table"
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @update:page="handlePageChange"
  />
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {type DataTableColumns} from "naive-ui";
import type {MoneyRecord, MoneyRecordParam} from "@/api/income/money-record/model";
import {pageMoneyRecords} from "@/api/income/money-record";

/**
 * 支出记录 Columns
 */
const createColumns = (): DataTableColumns<MoneyRecord> => {
  return [
    {
      title: '记录名称',
      key: 'name',
      width: 280,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '金额',
      key: 'money',
      align: 'center'
    },
    {
      title: '余额',
      key: 'balance',
      align: 'center'
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 200,
      align: 'center'
    },
  ]
}

export default defineComponent({
  name: "WalletExpensesTable",
  setup() {

    /**
     * 充值数据显示
     */
    const loadingRef = ref(true);
    const createData = ref<MoneyRecord[]>([{}]);
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 0,
      prefix: () => {
        return '已消费完成的记录只保存一个月！'
      }
    })

    /**
     * 提交的附加内容
     */
    const params = reactive<MoneyRecordParam>({
      page: 1,
      limit: 5
    });

    onMounted(() => {
      nextTick(() => {
        query(params);
      })
    })

    /**
     * 查询订单数据
     * @param limit
     * @param page
     */
    const query = (params) => {
      pageMoneyRecords(params).then((res) => {
        loadingRef.value = false;
        paginationReactive.pageCount = Math.ceil(res?.count / params.limit);
        createData.value = res?.list.map((mDate?: MoneyRecord) => {
          return {
            ...mDate
          }
        })
      })
    }

    /**
     * 点击分页查询
     * @param currentPage
     */
    const handlePageChange = (currentPage) => {
      loadingRef.value = true;
      params.page = currentPage;
      paginationReactive.page = currentPage;
      query(params);
    }

    return {
      data: createData,
      columns: createColumns(),
      loading: loadingRef,
      handlePageChange,
      pagination: paginationReactive,
    }
  }
})
</script>

<style scoped>
.bomaos-wrapper {
  margin: 15px;
  background-color: white;
  border-radius: 8px
}

.van-theme-dark .bomaos-wrapper {
  background-color: #1c1c1e;
}

.bomaos-order-item {
  display: flex;
  flex-direction: row;
  padding: 15px;
  align-items: flex-start;
}

.bomaos-order-item .bomaos-order-detail {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.bomaos-order-item .bomaos-order-detail .paytime{
  color: #666;
  font-size: 12px;
  margin-top: 5px;
}

.van-theme-dark .bomaos-order-item .bomaos-order-detail .paytime {
  color: #999;
}

.bomaos-order-item .bomaos-order-detail .bomaos-order-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.bomaos-order-item .bomaos-order-detail .bomaos-order-title h3 {
  font-size: 16px;
  font-weight: 400;
}

.van-theme-dark .bomaos-order-item .bomaos-order-detail .bomaos-order-title h3 {
  color: white;
}

.bomaos-order-item .bomaos-order-detail .bomaos-order-title span {
  font-weight: bold;
  font-size: 15px;
  color: #409EFF;
}

.bomaos-order-item .bomaos-order-detail .bomaos-order-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.bomaos-order-item .bomaos-order-detail .bomaos-order-bottom h4 {
  color: #666;
  font-size: 12px;
  font-weight: normal;
}

.van-theme-dark .bomaos-order-item .bomaos-order-detail .bomaos-order-bottom h4 {
  color: #999;
}

.bomaos-order-item .bomaos-order-detail .bomaos-order-bottom span {
  font-size: 12px;
  color: #666;
}

.van-theme-dark .bomaos-order-item .bomaos-order-detail .bomaos-order-bottom span {
  color: #999;
}
</style>