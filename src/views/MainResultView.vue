<template>

  <div class="container">

    <!-- 共通ヘッダー -->
    <div class="header-buttons">

      <!-- 左：ユーザー名 -->
      <p class="user">{{ user.name }}様</p>

      <!-- 右：ボタン -->
      <div class="right">
        <button type="button" class="btn back-btn" @click="goBack">
          前のページに戻る
        </button>

        <button type="button" class="btn logout-btn" @click="logout">
          ログアウト
        </button>
      </div>

    </div>

    <div class="wood-top"></div>

    <!-- タイトル統一 -->
    <h1 class="main-title">占いのハウス</h1>
    <h2 class="sub-title">占い結果</h2>

    <!-- 結果 -->
    <p class="result">
      今日の運勢は…
    </p>


    <h2 class="result-text">
      <span
        v-for="(char, index) in result.split('')"
        :key="index"
        :class="getCharClass(char)">

        {{ char }}
      </span>
    </h2>


    <!-- 再抽選 -->
    <button type="button" class="btn retry" @click="draw">
      もう一度占う
    </button>

  </div>

  <p class="credit">
    Image Credit: NASA
  </p>

</template>


<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // 結果
  const result = ref('')

  const getResultClass = () => {
    if (result.value.includes('吉')) {
      return 'good'
    }
    if (result.value.includes('凶')) {
      return 'bad'
    }
    return ''
  }

  // 占い
  const draw = () => {
    const list = ['大吉', '中吉', '小吉', '吉', '普通', '吉凶', '凶', '小凶', '中凶', '大凶', '有りか無しかでいったら有り']
    const index = Math.floor(Math.random() * list.length)
    result.value = list[index]
  }

  // 初回実行
  onMounted(() => {
    draw()
  })

  // 戻る
  const goBack = () => {
    router.push('/main')
  }

  // ログアウト（重要！）
  const logout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')


  const getCharClass = (char: string) => {
    // 黒
    if (result.value === '普通') return ''
    if (result.value === '有りか無しかでいったら有り') return ''

    // 吉系（全部赤）
    if (['大吉', '中吉', '小吉', '吉'].includes(result.value)) {
      return 'good'
    }

    // 凶系（全部青）
    if (['凶', '小凶', '中凶', '大凶'].includes(result.value)) {
      return 'bad'
    }

    // 吉凶（赤と青）
    if (result.value === '吉凶') {
      if (char === '吉') return 'good'
      if (char === '凶') return 'bad'
    }

    return ''
  }


</script>


<style scoped>

  /* 全体 */
  .container {
    text-align: center;

    height: 100vh;
    width: 100vw;

    background-image: url('/src/assets/moon2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

   /* ヘッダー */
  .header-buttons {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 90%;
    margin: 20px auto;

    position: relative;
    z-index: 3;
  }
  
  .wood-top {
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 80px;

    background-image: url('/src/assets/mokuzai1.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    z-index: 2;
  }

  /* ユーザー名 */
  .user {
    font-weight: bold;
    font-size: 24px;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.8);

    position: relative;
    top: -10px;
  }

  /* ボタン共通 */
  .btn {
    padding: 12px 20px;
    font-size: 1rem;
    border-radius: 6px;
  }

    .back-btn,
  .logout-btn {
    width: auto;
    padding: 10px 20px;
  }

  .retry {
    display: block;
    width: 100%;
    max-width: 320px;
    margin: 40px auto;
    font-size: 1.2rem;
  }


  /* タイトル */
  .main-title {
    font-size: 4rem;
    margin-top: 80px;
    margin-bottom: 50px;
  }

  /* サブタイトル */
  .sub-title {
    font-size: 2.5rem;
    margin-top: 0;
    margin-bottom: 80px;
  }


  /* 「今日の運勢は…」 */
  .result {
    margin-top: 0px;  
    margin-bottom: 30px; 
    font-size: 36px;
    color: #000;
  }

  .result-text {
    font-size: 64px;
    margin-top: 10px;
  }


  .good {
    color: red;
  }

  .bad {
    color: blue;
  }


  /* もう一度占うボタン */
  .retry {
    margin-top: 40px;
    padding: 12px 30px;
  }

   /* クレジット */
  .credit {
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }

  .right {
    display: flex;
    gap: 20px;
  }

  
  
</style>