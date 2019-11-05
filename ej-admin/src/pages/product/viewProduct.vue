<template>
  <div class="products">
    <!-- 按钮 -->
    <div>
      <el-button size="small" type="primary" @click="toAddHandler">添加</el-button>
      <el-button size="small" type="danger" @click="batchDeleteHandler">批量删除</el-button>
    </div>
    <!-- 表格 -->
    <div v-loading="loading">
      <el-table :data="products" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="idname" label="栏目编号" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="record">
            <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
            <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" /> &nbsp;
            <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form ref="productForm" :model="product" :rules="rules">
        <el-form-item label="名称" label-width="100px" prop="name">
          <el-input v-model="product.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="价格" label-width="100px" prop="price">
          <el-input v-model="product.price" auto-complete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="100px" prop="description">
          <el-input v-model="product.description" auto-complete="off" />
        </el-form-item>
        <el-form-item label="所属栏目" label-width="100px" prop="categoryId">
          <el-select v-model="product.categoryId" placeholder="请选择活动区域">
            <el-option v-for="c in category" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px" prop="status">
          <el-input v-model="product.status" auto-complete="off" />
        </el-form-item>
        <el-form-item label="产品主图" label-width="100px" prop="photo">
          <el-upload
            class="upload-demo"
            action="http://134.175.154.93:6677/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
            :limit="1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { defineDocExtension } from 'codemirror'
export default {
  data() {
    return {
      fileList: [],
      product: {},
      ids: null,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择服务种类', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('product', ['products', 'visible', 'title', 'loading', 'category']),
    ...mapGetters('product', ['productSize', 'orderProduct'])
  },
  created() {
    this.findAllProducts()
    this.findCategory()
    // this.idFindName();
  },
  methods: {
    ...mapMutations('product', ['showModal', 'closeModal', 'setTitle', 'findCategoryName', 'idFindName']),
    ...mapActions('product', ['findAllProducts', 'saveOrUpdateProduct', 'deleteProductById', 'batchDeleteProduct', 'findCategory']),
    // 普通方法
    toDetailsHandler(product) {
      // console.log(product.id)
      // 跳转到详情页面
      this.$router.push({
        path: '/product/detailsProduct',
        query: { id: product.id }
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    toAddHandler() {
      // 1. 重置表单
      this.product = {}
      this.setTitle('添加产品信息')
      // 2. 显示模态框
      this.showModal()
    },
    submitHandler() {
      // 校验
      this.$refs.productForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          this.saveOrUpdateProduct(this.product)
            .then((response) => {
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
              this.$message({ type: 'success', message: response.statusText })
            })
        } else {
          return false
        }
        this.closeModal()
      })
    },
    dialogCloseHandler() {
      this.$refs.productForm.resetFields()
      this.closeModal()
    },
    editHandler(row) {
      this.fileList.push({ url: row.photo })
      this.product = row
      this.setTitle('修改产品信息')
      this.showModal()
    },
    deleteHandler(id) {
      this.deleteProductById(id)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    batchDeleteHandler() {
      // console.log(this.ids);
      this.batchDeleteProduct(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    uploadSuccessHandler(response) {
      // console.log(response);
      // console.log(file);
      // console.log(fileList);
      if (response.status === 200) {
        const id = response.data.id
        const photo = 'http://134.175.154.93:8888/group1/' + id
        this.product.photo = photo
        // this.product = Object.assing({}, this.product)
      } else {
        this.$message.error('上传异常')
      }
    }
  }

}
</script>
<style scoped>

</style>
