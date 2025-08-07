<template>
  <div class="footer-area mt-25 bg-white border-top-radius" >
    <p>
      ©
      <span>Rwabit Altaqnia </span>
      is Proudly Owned by
      <a href="https://envytheme.com/" class="fw-semibold" target="_blank">
        Technical Education
      </a>
    </p>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.footer-area {
  padding: 19.5px 25px;
  span {
    color: #3584fc;
  }
  a {
    color: var(--primaryColor);
  }
}

@media only screen and (max-width: 767px) {
  .footer-area {
    padding: 15px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .footer-area {
    padding: 20px;
  }
}
</style>
