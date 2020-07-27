<template>
  <div class="category">
    <h2>栏目管理</h2>
    <!-- 按钮 -->
    <div class="btns">
      <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
      <el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
    </div>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="closeModal">
      <el-form ref="categoryForm" :model="form" :rules="rules">
        <el-form-item label="栏目名称" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="序号" label-width="80px" prop="num">
          <el-input v-model="form.num" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button type="primary" size="small" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
    <!-- 表格 -->
    <el-table :data="categories.list" size="small" @selection-change="idsChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="栏目名称" />
      <el-table-column prop="num" label="序号" width="100px" />
      <el-table-column label="操作" align="center">
        <template #default="record">
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteHandler(record.row.id)" />
          <el-button size="mini" type="primary" icon="el-icon-edit-outline" circle @click="editHandler(record.row)" />
          <el-button size="mini" type="success" icon="el-icon-view" circle @click="toDetailsHandler(record.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :current-page="params.page+1"
      :page-size="categories.pageSize"
      :total="categories.total"
      @current-change="pageChangeHandler"
    />
  <!-- /分页 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import category from '../../store/modules/category'
export default {
  data() {
    return {
      params: {
        page: 0,
        pageSize: 5,
        name: ''
      },
      ids: [],
      form: {},
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入序号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.findAllCategories(this.params)
  },
  computed: {
    ...mapState('category', ['categories', 'visible', 'title']),
    ...mapGetters('category', ['countCategories', 'categoryStatusFilter'])
    // 普通属性

  },
  methods: {
    ...mapActions('category', ['findAllCategories', 'deleteCategoryById', 'saveOrUpdateCategory', 'batchDeleteCategory']),
    ...mapMutations('category', ['showModal', 'closeModal', 'setTitle']),
    // 普通方法
    toDetailsHandler(category) {
      // 跳转到详情页面
      // this.$router.push("/categoryDetails")
      this.$router.push({
        path: '/category/details',
        query: { id: category.id }
      })
    },
    // 批量删除
    batchDeleteHandler() {
      this.batchDeleteCategory(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
      this.findAllCategories(this.params)
    },
    idsChangeHandler(val) {
      this.ids = val.map(item => item.id)
    },
    dialogCloseHandler() {
      this.$refs.categoryForm.clearValidate()
    },
    toAddHandler() {
      this.form = {}
      this.setTitle('添加栏目信息')
      this.showModal()
    },
    // 确认提交
    submitHandler() {
      // 1.表单验证
      this.$refs.categoryForm.validate((valid) => {
        if (valid) {
          // 2.提交表单
          this.saveOrUpdateCategory(this.form)
            .then((response) => {
              this.$message({ type: 'success', message: response.statusText })
            })
        } else {
          return false
        }
      })
      this.findAllCategories(this.params)
    },
    // 删除
    deleteHandler(id) {
      const promise = this.deleteCategoryById(id)
      promise.then((response) => {
        this.$message({ type: 'success', message: response.statusText })
        this.findAllCategories(this.params)
      })
    },
    editHandler(row) {
      this.form = row
      this.setTitle('修改栏目信息')
      this.showModal()
    },
    // 分页处理
    pageChangeHandler(currentPage) {
      this.params.page = currentPage - 1
      this.findAllCategories(this.params)
    }
  }
}
</script>
<style scoped>

</style>
