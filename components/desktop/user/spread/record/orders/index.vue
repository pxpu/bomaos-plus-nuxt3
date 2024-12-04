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
import {type DataTableColumns} from "naive-ui";
import type {RebateRecord, RebateRecordParam} from "@/api/member/rebate-record/model";
import {pageRebateRecords} from "@/api/member/rebate-record";

/**
 * 支出记录 Columns
 */
const createColumns = (): DataTableColumns<RebateRecord> => {
  return [
    {
      title: '商品名称',
      key: 'productName',
      width: 150,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '用户昵称',
      key: 'superiorNickName',
      width: 100,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '付款金额',
      key: 'money',
      width: 80,
      align: 'center'
    },
    {
      title: '佣金',
      key: 'brokerage',
      width: 70,
      align: 'center'
    },
    {
      title: '付款时间',
      key: 'paymentTime',
      width: 150,
      align: 'center'
    }
  ]
}

/**
 * 提交的附加内容
 */
const params = reactive<RebateRecordParam>({
  page: 1,
  limit: 5
});

/**
 * 充值数据显示
 */
const loadingRef = ref(true);
const createData = ref<RebateRecord[]>([{}]);
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
  pageRebateRecords(params).then((res) => {
    loadingRef.value = false;
    paginationReactive.pageCount = Math.ceil(res.count / params.limit);
    createData.value = res.list.map((mDate?: RebateRecord) => {
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