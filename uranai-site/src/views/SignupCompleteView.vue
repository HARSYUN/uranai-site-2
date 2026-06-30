<template>

  <div class="container">

    <!-- タイトル -->
    <h1>占いのハウス</h1>
    <h2>新規会員登録</h2>

    <div class="wood"></div>

    <!-- メッセージ -->
    <p class="message">
      会員登録が完了しました<br>
      スタート画面へお戻りください
    </p>

    <!-- ボタン -->
    <button @click="goStart">
      スタート画面へ
    </button>

  </div>

  <p class="credit">
    Image Credit: NASA
  </p>

</template>


<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goStart = () => {
    router.push('/')
  }
</script>



<style scoped>
  .container {
    text-align: center;

    min-height: 100vh;
    width: 100vw;

    height: 100vh;

    background-image: url('/src/assets/Perseids1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }


  h1 {
    font-size: 4rem;
    top: 80px;
    margin-top: 60px;
    margin-bottom: 80px; 
  }

  h2 {
    top: 60px;
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

    margin: -150px auto 60px;
    border-radius: 8px;

    position: static;
    z-index: 1;
  }



  .message {
    margin: 30px 0;
    line-height: 2;
    color: #000;
  }

  
  button {
    display: block;
    width: 100%;
    max-width: 320px;
    margin: 30px auto;
    padding: 12px;
    font-size: 1.2rem;
    border-radius: 6px;
  }

  h1, h2, .message, button {
    position: relative;
    z-index: 2;
  }

  .message,
  button {
    position: relative;
    top: -350px;   /* ←ここ調整ポイント */
    z-index: 2;
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