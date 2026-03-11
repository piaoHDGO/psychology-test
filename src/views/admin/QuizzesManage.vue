<template>
  <div class="quizzes-manage">
    <div class="page-header">
      <h1 class="page-title">题库管理</h1>
      <div class="header-actions">
        <button class="btn-sync" @click="syncAllToDatabase">🔄 同步本地数据到数据库</button>
        <button class="btn-add" @click="showAddModal = true">➕ 添加测试</button>
      </div>
    </div>

    <!-- 测试列表 -->
    <div class="quiz-list">
      <div v-for="quiz in quizzes" :key="quiz.code" class="quiz-card">
        <div class="quiz-header">
          <div class="quiz-icon" :style="{ background: quiz.color }">{{ quiz.icon }}</div>
          <div class="quiz-info">
            <h3>{{ quiz.name }}</h3>
            <p>{{ quiz.description }}</p>
          </div>
          <div class="quiz-actions">
            <button class="btn-edit" @click="editQuiz(quiz)">编辑</button>
            <button class="btn-questions" @click="editQuestions(quiz)">题目</button>
            <button class="btn-results" @click="editResults(quiz)">报告模板</button>
            <button
              v-if="quiz.status === 1"
              class="btn-offline"
              @click="toggleStatus(quiz)"
            >下线</button>
            <button
              v-else
              class="btn-online"
              @click="toggleStatus(quiz)"
            >发布上线</button>
          </div>
        </div>
        <div class="quiz-details">
          <div class="detail-item"><span class="label">题数</span><span class="value">{{ quiz.questionCount }}题</span></div>
          <div class="detail-item"><span class="label">分类</span><span class="value">{{ getCategoryName(quiz.category) }}</span></div>
          <div class="detail-item"><span class="label">价格</span><span class="value price">¥{{ quiz.price }}</span></div>
          <div class="detail-item"><span class="label">付费</span><span class="value paid" :class="{ active: quiz.paid === 1 }">{{ quiz.paid === 1 ? '付费' : '免费' }}</span></div>
          <div class="detail-item"><span class="label">状态</span><span class="value status" :class="{ active: quiz.status === 1 }">{{ quiz.status === 1 ? '上线中' : '已下线' }}</span></div>
        </div>
      </div>
    </div>

    <!-- 编辑题目弹窗 -->
    <div v-if="showQuestionsModal" class="modal-mask" @click="showQuestionsModal = false">
      <div class="modal questions-modal" @click.stop>
        <div class="modal-header">
          <h3>编辑题目 - {{ currentQuiz?.name }}</h3>
          <button class="btn-close" @click="showQuestionsModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="questions-list">
            <div v-for="(q, qIndex) in currentQuestions" :key="qIndex" class="question-item">
              <div class="question-header">
                <span class="q-number">Q{{ qIndex + 1 }}</span>
                <input v-model="q.question" class="question-input" placeholder="请输入问题" />
                <button class="btn-delete" @click="removeQuestion(qIndex)">删除</button>
              </div>
              <div class="options-list">
                <div v-for="(opt, oIndex) in q.options" :key="oIndex" class="option-row">
                  <span class="opt-label">{{ String.fromCharCode(65 + oIndex) }}</span>
                  <input v-model="opt.text" class="option-input" placeholder="选项内容" />
                  <input v-model.number="opt[scoreKey]" class="score-input" placeholder="分值" />
                  <button class="btn-delete-opt" @click="removeOption(qIndex, oIndex)">×</button>
                </div>
                <button class="btn-add-option" @click="addOption(qIndex)">+ 添加选项</button>
              </div>
            </div>
          </div>
          <button class="btn-add-question" @click="addQuestion">+ 添加题目</button>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showQuestionsModal = false">取消</button>
          <button class="btn-save" @click="saveQuestions">保存题目</button>
        </div>
      </div>
    </div>

    <!-- 编辑报告模板弹窗 -->
    <div v-if="showResultsModal" class="modal-mask" @click="showResultsModal = false">
      <div class="modal results-modal" @click.stop>
        <div class="modal-header">
          <h3>报告模板 - {{ currentQuiz?.name }}</h3>
          <button class="btn-close" @click="showResultsModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="results-list">
            <div v-for="(r, rIndex) in currentResults" :key="rIndex" class="result-item">
              <div class="result-header">
                <span class="r-type">{{ r.name || '未命名' }}</span>
                <button class="btn-delete" @click="removeResult(rIndex)">删除</button>
              </div>
              <div class="result-fields">
                <div class="field-group">
                  <label>名称/类型</label>
                  <input v-model="r.name" class="field-input" />
                </div>
                <div class="field-group">
                  <label>简短描述</label>
                  <textarea v-model="r.desc" class="field-textarea" placeholder="免费结果显示的简短描述"></textarea>
                </div>
                <div class="field-group">
                  <label>详细报告（付费内容）</label>
                  <textarea v-model="r.detail" class="field-textarea large" placeholder="付费后显示的完整分析报告"></textarea>
                </div>
                <div class="field-group" v-if="r.careers || r.strengths">
                  <label>{{ r.careers ? '职业建议' : '性格优势' }}（付费内容，每行一个）</label>
                  <textarea v-model="r.extField" class="field-textarea" :placeholder="r.careers ? '每行一个职业' : '每行一个优势'"></textarea>
                </div>
              </div>
            </div>
            <button class="btn-add-result" @click="addResult">+ 添加结果类型</button>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showResultsModal = false">取消</button>
          <button class="btn-save" @click="saveResults">保存模板</button>
        </div>
      </div>
    </div>

    <!-- 编辑基本信息弹窗 -->
    <div v-if="showEditModal" class="modal-mask" @click="showEditModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>编辑测试</h3>
          <button class="btn-close" @click="showEditModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>测试名称</label>
            <input v-model="editForm.name" type="text" />
          </div>
          <div class="form-group">
            <label>描述</label>
            <input v-model="editForm.description" type="text" />
          </div>
          <div class="form-group">
            <label>价格 (¥)</label>
            <input v-model.number="editForm.price" type="number" step="0.1" />
          </div>
          <div class="form-group">
            <label>图标</label>
            <div class="icon-select">
              <span v-for="icon in icons" :key="icon" class="icon-option" :class="{ selected: editForm.icon === icon }" @click="editForm.icon = icon">{{ icon }}</span>
            </div>
          </div>
          <div class="form-group">
            <label>颜色</label>
            <div class="color-select">
              <span v-for="color in colors" :key="color" class="color-option" :class="{ selected: editForm.color === color }" :style="{ background: color }" @click="editForm.color = color"></span>
            </div>
          </div>
          <div class="form-group">
            <label>分类</label>
            <select v-model="editForm.category">
              <option value="psychology">心理测试</option>
              <option value="career">职业测试</option>
              <option value="fengshui">玄学测试</option>
            </select>
          </div>
          <div class="form-group">
            <label>付费开关</label>
            <select v-model="editForm.paid">
              <option :value="0">免费</option>
              <option :value="1">付费</option>
            </select>
          </div>
          <div class="form-group">
            <label>状态</label>
            <select v-model="editForm.status">
              <option :value="1">上线</option>
              <option :value="0">下线</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showEditModal = false">取消</button>
          <button class="btn-save" @click="saveQuiz">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { getQuizList, syncQuizzesToServer, getAllQuizzesFromServer } from '@/data/quizzes'
import { quizzes as localQuizzes } from '@/data/quizzes'

const quizzes = ref([])
const showEditModal = ref(false)

// 页面加载时从服务器获取数据
onMounted(async () => {
  const data = await getAllQuizzesFromServer()
  if (data && data.length > 0) {
    quizzes.value = data
  } else {
    // 如果服务器没有数据，使用本地默认数据
    quizzes.value = await getQuizList()
  }
})
const showQuestionsModal = ref(false)
const showResultsModal = ref(false)

const currentQuiz = ref(null)
const currentQuestions = ref([])
const currentResults = ref([])
const scoreKey = ref('e')

const editForm = reactive({ code: '', name: '', description: '', price: 0, icon: '', color: '', category: 'psychology', status: 1, paid: 0 })

const icons = ['🎯', '🧠', '🎨', '⭐', '🔮', '💼', '🧡', '💰', '📚', '🎭', '🦋', '🌟']
const colors = ['#FFE5E5', '#E5F0FF', '#FFF4E5', '#F0E5FF', '#E5FFE5', '#FFE5E0', '#E5FFFF', '#FFF0E5']
const syncing = ref(false)

// 同步本地数据到数据库
async function syncAllToDatabase() {
  if (syncing.value) return
  syncing.value = true

  try {
    const result = await syncQuizzesToServer(localQuizzes)
    if (result.success) {
      alert('同步成功！' + result.message)
      // 刷新数据
      const data = await getAllQuizzesFromServer()
      if (data && data.length > 0) {
        quizzes.value = data
      }
    } else {
      alert('同步失败: ' + result.message)
    }
  } catch (e) {
    alert('同步失败: ' + e.message)
  } finally {
    syncing.value = false
  }
}

function getCategoryName(category) {
  const names = { psychology: '心理测试', career: '职业测试', fengshui: '玄学测试' }
  return names[category] || category
}

function editQuiz(quiz) {
  Object.assign(editForm, quiz)
  showEditModal.value = true
}

// 切换上下线状态
function toggleStatus(quiz) {
  const newStatus = quiz.status === 1 ? 0 : 1
  const action = newStatus === 1 ? '上线' : '下线'

  if (confirm(`确定要${action}「${quiz.name}」吗？`)) {
    quiz.status = newStatus
    // 保存到本地存储
    const quizList = JSON.parse(localStorage.getItem('quizzes') || '[]')
    const index = quizList.findIndex(q => q.code === quiz.code)
    if (index !== -1) {
      quizList[index].status = newStatus
      localStorage.setItem('quizzes', JSON.stringify(quizList))
    }
    // 同时更新 quizzes 响应式数组
    const localQuiz = quizzes.value.find(q => q.code === quiz.code)
    if (localQuiz) {
      localQuiz.status = newStatus
    }
    alert(`已${action}`)
  }
}

function editQuestions(quiz) {
  currentQuiz.value = quiz
  currentQuestions.value = JSON.parse(JSON.stringify(quiz.questions || []))
  // 根据测试类型设置计分字段
  if (quiz.code === 'mbti') scoreKey.value = 'e'
  else if (quiz.code === 'age') scoreKey.value = 'age'
  else if (quiz.code === 'color') scoreKey.value = 'red'
  else if (quiz.code === 'star') scoreKey.value = 'star'
  else if (quiz.code === 'bazi') scoreKey.value = 'bazi'
  else if (quiz.code === 'career') scoreKey.value = 'r'
  else if (quiz.code === 'eq') scoreKey.value = 'eq'
  showQuestionsModal.value = true
}

function editResults(quiz) {
  currentQuiz.value = quiz
  const rawResults = quiz.results?.types || quiz.results?.ranges || []
  // 标准化字段名，统一使用 name, desc, detail, extField
  currentResults.value = JSON.parse(JSON.stringify(rawResults)).map(r => ({
    name: r.name || r.resultType || r.star || r.type || r.level || '',
    desc: r.desc || r.description || '',
    detail: r.detail || r.detailReport || '',
    careers: r.careers || [],
    strengths: r.strengths || [],
    extField: (r.careers || r.strengths || []).join('\n')
  }))
  showResultsModal.value = true
}

function addQuestion() {
  currentQuestions.value.push({ question: '', options: [{ text: '', [scoreKey.value]: 0 }, { text: '', [scoreKey.value]: 0 }] })
}

function removeQuestion(index) { currentQuestions.value.splice(index, 1) }
function addOption(qIndex) { currentQuestions.value[qIndex].options.push({ text: '', [scoreKey.value]: 0 }) }
function removeOption(qIndex, oIndex) { currentQuestions.value[qIndex].options.splice(oIndex, 1) }

function addResult() {
  currentResults.value.push({ name: '', desc: '', detail: '', careers: [], strengths: [] })
}

function removeResult(index) { currentResults.value.splice(index, 1) }

async function saveQuestions() {
  // 更新题库
  const quiz = quizzes.value.find(q => q.code === currentQuiz.value.code)
  if (quiz) {
    quiz.questions = currentQuestions.value
    quiz.questionCount = currentQuestions.value.length
    // 同步到服务器
    const result = await syncQuizzesToServer(quizzes.value)
    // 保存到localStorage作为备份
    localStorage.setItem('quiz_data', JSON.stringify(quizzes.value))
    if (!result.success) {
      alert('题目已保存，但同步服务器失败: ' + result.message)
      return
    }
  }
  showQuestionsModal.value = false
  alert('题目保存成功！已同步到数据库')
}

async function saveResults() {
  // 处理extField文本转换
  currentResults.value.forEach(r => {
    if (r.extField) {
      const arr = r.extField.split('\n').filter(s => s.trim())
      if (r.careers) r.careers = arr
      else if (r.strengths) r.strengths = arr
    }
  })

  const quiz = quizzes.value.find(q => q.code === currentQuiz.value.code)
  if (quiz) {
    if (quiz.code === 'mbti' || quiz.code === 'career') quiz.results = { types: currentResults.value }
    else if (quiz.code === 'age' || quiz.code === 'eq') quiz.results = { ranges: currentResults.value }
    else quiz.results = { types: currentResults.value }
    // 同步到服务器
    const result = await syncQuizzesToServer(quizzes.value)
    // 保存到localStorage作为备份
    localStorage.setItem('quiz_data', JSON.stringify(quizzes.value))
    if (!result.success) {
      alert('报告模板已保存，但同步服务器失败: ' + result.message)
      return
    }
  }
  showResultsModal.value = false
  alert('报告模板保存成功！已同步到数据库')
}

async function saveQuiz() {
  const index = quizzes.value.findIndex(q => q.code === editForm.code)
  if (index !== -1) {
    quizzes.value[index] = { ...quizzes.value[index], ...editForm }
    // 同步到服务器
    const result = await syncQuizzesToServer(quizzes.value)
    // 保存到localStorage作为备份
    localStorage.setItem('quiz_data', JSON.stringify(quizzes.value))
    if (!result.success) {
      alert('保存成功，但同步服务器失败: ' + result.message)
      showEditModal.value = false
      return
    }
  }
  showEditModal.value = false
  alert('保存成功！已同步到数据库')
}
</script>

<style lang="scss" scoped>
.quizzes-manage {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .btn-add, .btn-sync {
      padding: 10px 20px;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
    }

    .btn-add {
      background: #667eea;
    }

    .btn-sync {
      background: #52c41a;
    }

    .btn-sync:hover {
      background: #389e0d;
    }

    .btn-sync:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}

.quiz-list {
  display: grid;
  gap: 16px;
}

.quiz-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  .quiz-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .quiz-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-right: 16px;
    }

    .quiz-info {
      flex: 1;

      h3 {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 4px;
      }

      p {
        font-size: 13px;
        color: #999;
      }
    }

    .quiz-actions {
      display: flex;
      gap: 8px;

      button {
        padding: 6px 14px;
        border-radius: 6px;
        font-size: 13px;
        cursor: pointer;
        border: none;
      }

      .btn-edit {
        background: #f0f0f0;
        color: #666;
      }

      .btn-questions, .btn-results {
        background: #e3f2fd;
        color: #1976d2;
      }

      .btn-offline {
        background: #fff3e0;
        color: #f57c00;
      }

      .btn-online {
        background: #e8f5e9;
        color: #388e3c;
      }
    }
  }

  .quiz-details {
    display: flex;
    gap: 32px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;

    .detail-item {
      display: flex;
      flex-direction: column;

      .label {
        font-size: 12px;
        color: #999;
        margin-bottom: 4px;
      }

      .value {
        font-size: 14px;
        color: #333;
        font-weight: 500;

        &.price {
          color: #ff6b6b;
        }

        &.status.active {
          color: #52c41a;
        }

        &.paid.active {
          color: #ff6b6b;
        }
      }
    }
  }
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  overflow: hidden;

  &.questions-modal, &.results-modal {
    max-width: 800px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;

    h3 {
      font-size: 18px;
      font-weight: 600;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 24px;
      color: #999;
      cursor: pointer;
    }
  }

  .modal-body {
    padding: 20px;
    max-height: 60vh;
    overflow-y: auto;
  }

  .modal-footer {
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    button {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
    }

    .btn-cancel {
      background: #f0f0f0;
      border: none;
      color: #666;
    }

    .btn-save {
      background: #667eea;
      border: none;
      color: white;
    }
  }
}

.form-group {
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  input, select {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }

  .icon-select, .color-select {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .icon-option {
      width: 40px;
      height: 40px;
      border: 2px solid #f0f0f0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;

      &.selected {
        border-color: #667eea;
        background: #f0edff;
      }
    }

    .color-option {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      border: 3px solid transparent;

      &.selected {
        border-color: #333;
      }
    }
  }
}

.question-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;

  .question-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    .q-number {
      font-weight: 600;
      color: #667eea;
      margin-right: 12px;
    }

    .question-input {
      flex: 1;
      padding: 10px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }

    .btn-delete {
      padding: 6px 12px;
      background: #ffebee;
      color: #f44336;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-left: 8px;
    }
  }

  .options-list {
    .option-row {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      .opt-label {
        width: 24px;
        font-weight: 600;
        color: #666;
      }

      .option-input {
        flex: 1;
        padding: 8px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        margin-right: 8px;
      }

      .score-input {
        width: 60px;
        padding: 8px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        margin-right: 8px;
      }

      .btn-delete-opt {
        padding: 4px 8px;
        background: none;
        border: none;
        color: #999;
        cursor: pointer;

        &:hover {
          color: #f44336;
        }
      }
    }

    .btn-add-option {
      padding: 8px;
      background: none;
      border: 1px dashed #ccc;
      border-radius: 6px;
      width: 100%;
      color: #666;
      cursor: pointer;

      &:hover {
        border-color: #667eea;
        color: #667eea;
      }
    }
  }
}

.btn-add-question {
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
}

.result-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .r-type {
      font-weight: 600;
      color: #667eea;
    }

    .btn-delete {
      padding: 6px 12px;
      background: #ffebee;
      color: #f44336;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  }

  .result-fields {
    .field-group {
      margin-bottom: 12px;

      label {
        display: block;
        font-size: 13px;
        color: #666;
        margin-bottom: 6px;
      }

      .field-input, .field-textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #667eea;
        }
      }

      .field-textarea {
        min-height: 80px;
        resize: vertical;

        &.large {
          min-height: 150px;
        }
      }
    }
  }
}

.btn-add-result {
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
}
</style>
