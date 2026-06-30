<template>

  <div class="container">

    <div class="header-buttons"></div>

    <div class="wood"></div>

    <!-- タイトル -->
    <h1>占いのハウス</h1>
    <h2>新規会員登録</h2>

    <!-- メッセージ -->
    <p class="message">
      メールアドレスに確認メールを送信しました<br>
      確認メールの内容の手順に従って本登録をお願いします<br>
      (仮サイトの文章です、実際にメールに届くわけではありません。)
    </p>

    <!-- ボタン -->
    <button @click="goComplete">
      本登録する
    </button>

  </div>
  
  <p class="credit">
    Image Credit: NASA
  </p>

</template>


<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goComplete = () => {
    router.push('/signup_complete')
  }
</script>


<style scoped>
  .container {
    text-align: center;
    width: 100vw;
    min-height: 100vh;

    background-image: url('/src/assets/Perseids1.jpg');
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 80px;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 40px;
  }

  .wood {
    background-image: url('/src/assets/mokuzai2.png');
    background-size: cover;
    background-position: center;

    width: 100%;
    max-width: 640px;
    height: 500px;

    margin: 100px auto -480px;
    border-radius: 8px;

    position: static;
    z-index: 1;
  }

  .message {
    margin: 40px 0;
    line-height: 2;
    color: #000;
  }


  .header-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  


  button {
    display: block;
    width: 100%;
    max-width: 320px;
    margin: 30px auto;
    padding: 12px;
    font-size: 1.8rem;
    border-radius: 6px;
  }

    /* クレジット */
  .credit {
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }

</style>