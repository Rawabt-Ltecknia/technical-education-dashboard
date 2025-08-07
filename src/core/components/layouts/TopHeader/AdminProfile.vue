<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <button class="profile-btn align-items-center" v-bind="props">
        <v-img src="/assets/images/user.png" alt="admin" />
        <span class="fw-semibold text-black">User Name</span>
      </button>
    </template>
    <v-list class="profile-menu-dropdown">
      <div class="admin d-flex align-items-center">
        <v-img src="/assets/images/user.png" alt="admin-image" />
        <div>
          <span class="d-block text-black fw-medium"> User Name </span>
<!--          <span class="d-block"> Marketing Manager </span>-->
        </div>
      </div>
      <ul class="list pl-0 mt-0 mb-0 list-unstyled">

        <li>
          <router-link to="/my-profile" class="d-block position-relative">
            <i class="material-symbols-outlined">account_circle</i>
            حسابي
          </router-link>
        </li>
<!--        <li>-->
<!--          <router-link to="/apps/chat" class="d-block position-relative">-->
<!--            <i class="material-symbols-outlined">chat</i> Messages-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--          <router-link-->
<!--            to="/apps/file-manager/my-drive"-->
<!--            class="d-block position-relative"-->
<!--          >-->
<!--            <i class="material-symbols-outlined">format_list_bulleted</i>-->
<!--            My Task-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--          <router-link-->
<!--            to="/authentication/sign-in"-->
<!--            class="d-block position-relative"-->
<!--          >-->
<!--            <i class="material-symbols-outlined">credit_card</i>-->
<!--            Billing-->
<!--          </router-link>-->
<!--        </li>-->
        <li>
          <router-link to="/profile" class="d-block position-relative">
            <i class="material-symbols-outlined">settings</i>
            أعدادات
          </router-link>
        </li>
        <li>
          <router-link
              to="/authentication/lock-screen"
              class="d-block position-relative"
          >
            <i class="material-symbols-outlined">lock </i>
            الاغلاق
          </router-link>
        </li>
      </ul>
      <div class="border-top"></div>
      <ul class="list pl-0 mt-0 mb-0 list-unstyled">

        <li>
          <router-link
            to="/settings/account-settings"
            class="d-block position-relative"
          >
            <i class="material-symbols-outlined">support</i>
            الدعم
          </router-link>
        </li>

        <li>
          <router-link
            to="/authentication/logout"
            class="d-block position-relative"
          >
            <i class="material-symbols-outlined">logout </i>
            تسجيل الخروج
          </router-link>
        </li>
      </ul>
    </v-list>
  </v-menu>
</template>

<script l>
export default {
  name: "AdminProfile",
};
</script>
