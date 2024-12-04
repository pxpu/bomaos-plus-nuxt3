<template>
  <n-data-table
      :remote="true"
      size="large"
      ref="table"
      :columns="createColumns()"
      :data="createData"
      :loading="loadingRef"
      :pagination="paginationReactive"
      @update:page="handlePageChange"
  />
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {type DataTableColumns, NTag} from "naive-ui";
import type {WithdrawRecord, WithdrawRecordParam} from "@/api/member/withdraw-record/model";
import {pageWithdrawRecords} from "@/api/member/withdraw-record";

/**
 * 支出记录 Columns
 */
const createColumns = (): DataTableColumns<WithdrawRecord> => {
  return [
    {
      title: '提现类型',
      key: 'withdrawType',
      width: 80
    },
    {
      title: '提现账户',
      key: 'account',
      width: 120,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '提现金额',
      key: 'money',
      width: 80,
      align: 'center'
    },
    {
      title: '状态',
      key: 'status',
      width: 70,
      align: 'center',
      render (row) {
        return h(
            NTag,
            {
              size: 'small',
              type: row.status == 1 ? 'success' : row.status == 2 ? 'error' : 'warning',
              bordered: true
            },
            {
              default: () => {
                if (row.status == 1) {
                  return '提现成功'
                } else if (row.status == 2) {
                  return '提现错误';
                } else {
                  return '等待到账';
                }
              }
            }
        )
      }
    },
    {
      title: '提现说明',
      key: 'summary',
      width: 100
    },
    {
      title: '提现时间',
      key: 'createTime',
      width: 140,
      align: 'center'
    }
  ]
}

/**
 * 提交的附加内容
 */
const params = reactive<WithdrawRecordParam>({
  page: 1,
  limit: 5
});

/**
 * 充值数据显示
 */
const loadingRef = ref(true);
const createData = ref<WithdrawRecord[]>([{}]);
const paginationReactive = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 0
})

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
  pageWithdrawRecords(params).then((res) => {
    loadingRef.value = false;
    paginationReactive.pageCount = Math.ceil(res.count / params.limit);
    createData.value = res.list.map((mDate?: WithdrawRecord) => {
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
</script>

<style scoped lang="less">

</style>