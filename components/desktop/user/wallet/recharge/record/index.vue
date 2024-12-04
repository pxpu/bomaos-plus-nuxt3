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
import {defineComponent, h, reactive, ref} from "vue";
import {type DataTableColumns, NTag} from "naive-ui";
import type {RechargeRecord, RechargeRecordParam} from "@/api/income/recharge-record/model";
import {pageRechargeRecords} from "@/api/income/recharge-record";

/**
 * 充值记录 Columns
 */
const createColumns = (): DataTableColumns<RechargeRecord> => {
  return [
    {
      title: '订单号',
      key: 'rechargeId',
      width: 180,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '充值名称',
      key: 'name',
      width: 100,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '状态',
      key: 'status',
      width: 80,
      render (row) {
        return h(
            NTag,
            {
              type: 'info',
              size: "small"
            },
            {
              default: () => row.status == 1 ? '已充值' : '未充值'
            }
        )
      },
      align: 'center'
    },
    {
      title: '充值金额',
      key: 'totalAmount',
      width: 90,
      align: 'center'
    },
    {
      title: '充值时间',
      key: 'paymentTime',
      width: 180,
      align: 'center'
    },
  ]
}

export default defineComponent({
  name: "WalletRechargeTable",
  setup() {

    /**
     * 充值数据显示
     */
    const loadingRef = ref(true);
    const createData = ref<RechargeRecord[]>([{}]);
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 0,
      prefix: () => {
        return '已充值完成的记录只保存一个月！'
      }
    })

    /**
     * 提交的附加内容
     */
    const params = reactive<RechargeRecordParam>({
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
      pageRechargeRecords(params).then((res) => {
        loadingRef.value = false;
        paginationReactive.pageCount = Math.ceil(res.count / params.limit);
        createData.value = res.list.map((mDate?: RechargeRecord) => {
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