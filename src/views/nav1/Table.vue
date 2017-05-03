<template>
	<section>


		<!--工具条1-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item style="position: relative;cursor: pointer">
					<el-button type="primary">
						上传 Excel 文件
					</el-button>
					<input ref="uploadInput" @change="uploadExcel" style="position: absolute;left: 0;top: 0;width: 100%;height:100%;opacity: 0;" type="file"/>
				</el-form-item>
				<el-form-item style="transform: translateY(-100%)" >
				</el-form-item>
			</el-form>
		</el-col>


		<!--列表-->

		<el-table :data="uploadData" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="700" style="width: 100%">
			<el-table-column type="index" style="text-align: center">
			</el-table-column>
			<el-table-column type="selection" width="50">
			</el-table-column>
			<el-table-column prop="学号" label="学号"  sortable>
			</el-table-column>
			<el-table-column prop="姓名" label="姓名" sortable>
			</el-table-column>
			<el-table-column prop="计算机电路基础" label="计算机电路基础" sortable>
			</el-table-column>
			<el-table-column prop="数据结构" label="数据结构" sortable>
			</el-table-column>
			<el-table-column prop="操作系统" label="操作系统" sortable>
			</el-table-column>
			<el-table-column prop="程序设计课程设计" label="程序设计课程设计" sortable>
			</el-table-column>
			<el-table-column prop="毛泽东思想和中国特色理论体系概论" label="毛泽东思想和中国特色理论体系概论" sortable>
			</el-table-column>
			<el-table-column prop="大学英语A(4)" label="大学英语A(4)" sortable>
			</el-table-column>
			<el-table-column prop="平均成绩" label="平均成绩" sortable>
			</el-table-column>
			<el-table-column prop="不及格科数" label="不及格科数" sortable>
			</el-table-column>
			<el-table-column label="操作" width="140" fixed="right" style="text-align:center">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click.native.prevent="deleteRow(scope.$index, uploadData)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>


		<!--工具条2-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--&lt;!&ndash;列表&ndash;&gt;-->
		<!--<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">-->
		<!--<el-table-column type="selection" width="55">-->
		<!--</el-table-column>-->
		<!--<el-table-column type="index" width="60">-->
		<!--</el-table-column>-->
		<!--<el-table-column prop="name" label="姓名" width="120" sortable>-->
		<!--</el-table-column>-->
		<!--<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>-->
		<!--</el-table-column>-->
		<!--<el-table-column prop="age" label="年龄" width="100" sortable>-->
		<!--</el-table-column>-->
		<!--<el-table-column prop="birth" label="生日" width="120" sortable>-->
		<!--</el-table-column>-->
		<!--<el-table-column prop="addr" label="地址" min-width="180" sortable>-->
		<!--</el-table-column>-->
		<!--<el-table-column label="操作" width="150">-->
		<!--<template scope="scope">-->
		<!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
		<!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
		<!--</template>-->
		<!--</el-table-column>-->
		<!--</el-table>-->

		<!--&lt;!&ndash;工具条&ndash;&gt;-->
		<!--<el-col :span="24" class="toolbar">-->
		<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
		<!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">-->
		<!--</el-pagination>-->
		<!--</el-col>-->

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
    import util from '../../common/js/util'
    import axios from 'axios';
    import Qs from 'qs'

    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser  } from '../../api/api';

    export default {
        data() {
            return {
                wb: '',//读取完成的数据
                rABS : false, //是否将文件读取为二进制字符串
                uploadData: [],
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                }

            }
        },
        methods: {

            deleteRow(index, rows) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                })
            },
            importf() {//导入
                let obj = this.$refs.uploadInput
                let _this = this

                console.log(obj.files)

                if(!obj.files) {
                    return;
                }

                if(obj.files[0].name.slice(-4)!=='.xls') {
                    this.$message.error('不支持的文件格式，请上传 Excel 文件');
                    return false;
				}

                let f = obj.files[0];
                let reader = new FileReader();

                reader.onload = function(e) {
                    _this.listLoading = true

                    let data = e.target.result;
                    if(_this.rABS) {
                        _this.wb = XLSX.read(btoa(_this.fixdata(data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        _this.wb = XLSX.read(data, {
                            type: 'binary'
                        });
                    }
                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据

					setTimeout(()=>{
                        _this.uploadData =  XLSX.utils.sheet_to_json(_this.wb.Sheets[_this.wb.SheetNames[0]]) ;
                        $.ajax({
                            type: "post",
                            url: "http://f6e141e2.ngrok.io/common/upload",
                            data:{
                                data:JSON.stringify(_this.uploadData)
                            },
                            success: function(data){
                                _this.listLoading = false
                                if(data.success==true){
                                    _this.$notify.success({
                                        title: '成功',
                                        message: '上传成功啦~',
                                    });
                                }
                                else{
                                    _this.$notify.error({
                                        title: '错误',
                                        message: '上传失败，建议您刷新后重试~',
                                    });
                                }
                            },
                            error: function(err){
                                console.log(err)
                            }
                        });
					},20)
                };
                if(_this.rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },

            fixdata(data) { //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            },

            uploadExcel(){
                try{
                    this.importf()
                }
                catch (err){
                    console.log(err)

                    this.$alert(err, '遇到错误', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `${ action }:操作已取消`
                            });
                        }
                    })
                }
            },

            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    console.log(res.data.users)
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
//            this.getUsers();
            this.listLoading = true

            setTimeout(()=>{
//                this.uploadData = [{"学号":"14132401984","姓名":"赵广军","计算机电路基础":"20","数据结构":"38","概率统计":"54","计算机组成原理":"61","算法设计与分析":"及格","数据结构与算法设计实验":"中","操作系统":"68","多媒体技术":"及格","IT企业参观见习":"优","程序设计课程设计":"良","大学体育(3)":"77","大学体育(4)":"84","马克思主义基本原理":"71","大学英语A(3)":"51","大学物理(2)":"36","大学物理实验(2)":"0","毛泽东思想和中国特色理论体系概论":"61","大学英语A(4)":"77","平均成绩":"58.78 ","排名":"137","不及格科数":"6"}]
                this.listLoading = false

            },1000)


        }
    }

</script>


<style scoped>
</style>