<template>
  <page-title :pageTitle="translation('AppName')" page-title-icon="mdi mdi-view-dashboard"
              :breadcrumb-items="[
                { text: 'Dashboard', to: '/dashboard' ,icon: 'mdi mdi-view-dashboard' },
                { text: 'Test',icon: 'mdi mdi-view-dashboard' },
                ]"

  ></page-title>
  <v-row>
    <v-col cols="12" xxl="6" lg="6">

      <v-card
          class="welcome-card trezo-card border-radius d-block border-0 shadow-none"
      >

        <div class="welcome-card-content">
          <div class="content">
            <h5 class="fw-semibold text-white">
              Welcome Back, <span>Olivia!</span>
            </h5>
            <p class="text-white">Your progress this week is Awesome.</p>
            <div class="extra-space"></div>
            <div class="d-md-flex align-items-center">
              <div class="item d-flex align-items-center">
                <div
                    class="icon text-danger bg-danger-200 border-radius d-flex align-items-center justify-content-center"
                >
                  <i class="material-symbols-outlined"> airplay </i>
                </div>
                <div>
                  <span class="title d-block fw-semibold text-white"> 75h </span>
                  <span class="d-block"> Hours Spent </span>
                </div>
              </div>
              <div class="item d-flex align-items-center">
                <div
                    class="icon text-success bg-success-100 border-radius d-flex align-items-center justify-content-center"
                >
                  <i class="material-symbols-outlined"> local_library </i>
                </div>
                <div>
                  <span class="title d-block fw-semibold text-white"> 15 </span>
                  <span class="d-block"> Course Completed </span>
                </div>
              </div>
            </div>
          </div>
          <div class="image">
            <v-img
                src="/assets/images/online-learning.gif"
                alt="online-learning-image"
            />
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" xxl="2" lg="4" md="4" sm="6">
      <v-card
          class="total-courses-card trezo-card border-radius d-block bg-white border-0 shadow-none"
      >
        <div class="courses-card-content">
          <span class="d-block text-body">
            Total Courses </span>
          <h5 class="mb-0">45.6k</h5>
          <div
              class="icon ml-auto mr-auto text-secondary bg-secondary-100 rounded-circle mx-auto d-flex align-items-center justify-content-center"
          >
            <i class="material-symbols-outlined"> auto_stories </i>
          </div>
          <div class="info d-flex align-items-center justify-space-between">
            <span class="d-block text-body"> This Month </span>
            <span class="lh-1 text-success">
          <i class="material-symbols-outlined"> trending_up </i>
        </span>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-row>

    <v-col cols="12" lg="12">
      <v-card
          class="courses-card trezo-card border-radius d-block bg-white border-0 shadow-none"
      >
        <div class="v-card-header">
          <h5 class="mb-0">Courses</h5>
          <div class="d-flex align-items-center">
            <v-menu>
              <template v-slot:activator="{ props }">
                <button
                    type="button"
                    v-bind="props"
                    class="card-header-menu border-none d-inline-block border-radius"
                >
                  All Courses
                </button>
              </template>
              <v-list class="menu-content">
                <button type="button" class="bg-transparent border-none">
                  This Day
                </button>
                <button type="button" class="bg-transparent border-none">
                  This Week
                </button>
                <button type="button" class="bg-transparent border-none">
                  This Month
                </button>
                <button type="button" class="bg-transparent border-none">
                  This Year
                </button>
              </v-list>
            </v-menu>
          </div>
        </div>
        <div class="trezo-table-content">
          <div class="trezo-table">
            <v-data-table :items="items" :headers="headers"
                          hover
            >
              <template v-slot:[`item.actions`]="props">
                <v-btn icon @click="editItem(props)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

            </v-data-table>

          </div>
        </div>
      </v-card>
    </v-col>

  </v-row>
  <v-row>
    <v-col cols="12" lg="12">
      <v-card
          class="courses-card trezo-card border-radius d-block bg-white border-0 shadow-none"
      >
        <div class="v-card-header">
          <h5 class="mb-0">Courses</h5>
          <div class="d-flex align-items-center">
            <v-menu>
              <template v-slot:activator="{ props }">
                <button
                    type="button"
                    v-bind="props"
                    class="card-header-menu border-none d-inline-block border-radius"
                >
                  All Courses
                </button>
              </template>
              <v-list class="menu-content">
                <button type="button" class="bg-transparent border-none">
                  This Day
                </button>
                <button type="button" class="bg-transparent border-none">
                  This Week
                </button>
                <button type="button" class="bg-transparent border-none">
                  This Month
                </button>
                <button type="button" class="bg-transparent border-none">
                  This Year
                </button>
              </v-list>
            </v-menu>
          </div>
        </div>
        <div class="trezo-table-content">
          <div class="trezo-table">
            <v-table>
              <thead>
              <tr>
                <th class="text-start">ID</th>
                <th class="text-start">Course Name</th>
                <th class="text-start">Category</th>
                <th class="text-start">Instructor</th>
                <th class="text-start">Enrolled</th>
                <th class="text-start">Start Date</th>
                <th class="text-start">End Date</th>
                <th class="text-start">Price</th>
                <th class="text-start">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in items.slice(0, 6)" :key="item.id">
                <td class="text-body">{{ item.id }}</td>
                <td class="text-start">
                  <RouterLink to="/dashboard" class="project-name fw-medium">
                    {{ item.courseName }}
                  </RouterLink>
                </td>
                <td>{{ item.category }}</td>
                <td>
                  <div class="customer-info d-flex align-items-center">
                    <!--                    <div class="img">-->
                    <!--                      <v-img-->
                    <!--                          :src="item.instructor.image"-->
                    <!--                          alt="instructor-image"-->
                    <!--                      />-->
                    <!--                    </div>-->
                    <span class="d-block text-black fw-medium">
                    {{ item.instructor.name }}
                  </span>
                  </div>
                </td>
                <td class="text-body">{{ item.enrolled }}</td>
                <td class="text-body">{{ item.startDate }}</td>
                <td class="text-body">{{ item.endDate }}</td>
                <td>
                  {{ item.price }}
                </td>
                <td>
                  <div class="action-buttons d-flex align-items-center">
                    <button type="button">
                      <i class="material-symbols-outlined">
                        {{ item.action.view }}
                      </i>
                    </button>
                    <button type="button">
                      <i class="material-symbols-outlined">
                        {{ item.action.edit }}
                      </i>
                    </button>
                    <button type="button">
                      <i class="material-symbols-outlined">
                        {{ item.action.delete }}
                      </i>
                    </button>
                  </div>
                </td>
              </tr>
              </tbody>
            </v-table>
          </div>
          <v-pagination :length="4"
                        active-color="primary"
                        color="primary"
                        last-icon="mdi mdi-chevron-double-left"
          ></v-pagination>

        </div>
      </v-card>
    </v-col>

  </v-row>
  <v-row>
    <v-col cols="12" lg="12">
      <v-card
          class="courses-card trezo-card border-radius d-block bg-white border-0 shadow-none"
      >

        <div class="trezo-table-content">
          <success-alert text="Hello"/>
          <error-alert
              class="mt-8"
              text="Hello"/>

          <info-alert
              class="mt-8"
              text="Hello"/>
          <warning-alert
              class="mt-8"
              text="Hello"/>
          <v-alert
              class="mt-8"
              border="start"
              type="success"
              icon="mdi mdi-check-circle-outline"
              :title="'title'"
              :closable="true"
              :text="'textContent'"
          >
            <slot></slot>
          </v-alert>
        </div>
      </v-card>
    </v-col>


  </v-row>
  <v-row>
    <v-col cols="12" lg="12">
      <v-card
          class="courses-card trezo-card border-radius d-block bg-white border-0 shadow-none"
      >

        <div class="trezo-table-content">
          {{ text }}
          <app-text-field
              v-model="text"
              :rules="required()"
              label="Enter"
              prepend-inner-icon="mdi mdi-account-circle-outline"/>

          <app-auto-complete-field
              v-model="text"
              :items="items"
              item-text="courseName"
              item-value="id"
              :rules="required()"
              label="Enter"
              prepend-inner-icon="mdi mdi-account-circle-outline"
              @on-refresh="handleRefresh"
          />
          <app-search-text-field
              @on-search="handleRefresh"
              prepend-inner-icon="mdi mdi-account-circle-outline"
              clearable
          />
          <app-file-input
              v-model="file"
              current-file-url="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              label="Upload"
              prepend-inner-icon="mdi mdi-paperclip"
              clearable
          />
          <app-date-picker
            v-model="texta"/>
          <app-time-picker
              v-model="texta"
          />
        </div>
      </v-card>
    </v-col>


  </v-row>


</template>

<script lang="ts" setup>
import PageTitle from "@/core/components/layouts/page-title/PageTitle.vue";
import {translation} from "@/plugins/i18n";
import {useSnackbarStore} from "@/stores/snackbar";
import SuccessAlert from "@/core/components/common/alerts/SuccessAlert.vue";
import ErrorAlert from "@/core/components/common/alerts/ErrorAlert.vue";
import InfoAlert from "@/core/components/common/alerts/InfoAlert.vue";
import WarningAlert from "@/core/components/common/alerts/WarningAlert.vue";
import AppTextField from "@/core/components/common/forms/AppTextField.vue";
import {validationRules} from "@/core/validators/validators-rules";
import {ref} from "vue";
import AppAutoCompleteField from "@/core/components/common/forms/AppAutoCompleteField.vue";
import AppSearchTextField from "@/core/components/common/forms/AppSearchTextField.vue";
import AppFileInput from "@/core/components/common/forms/AppFileInput.vue";
import AppDatePicker from "@/core/components/common/forms/AppDatePicker.vue";
import AppTimePicker from "@/core/components/common/forms/AppTimePicker.vue";

const required = () => validationRules.required();
const handleRefresh = () => alert('refresh');


const text = ref<string>("");
const file = ref<any|null>(null);
const texta = ref<any|null>(null);
const headers = [
  {title: 'Course Name', value: 'courseName', key: 'courseName', sortable: false},
  {title: 'Instructor', value: 'instructor.name', key: 'instructorName', sortable: true},
  {
    title: 'Full Name',
    key: 'fullName',
    value: (item: any) => `${item.enrolled} PPCO`,
  },
  {title: 'Actions', value: 'actions', sortable: false},


]
const items = [
  {
    id: "#854",
    courseName: "Cybersecurity Awareness",
    category: "Technology",
    instructor: {
      name: "Oliver Khan",
    },
    enrolled: 2,
    startDate: "25 Mar 2024",
    endDate: "25 Apr 2024",
    price: "$49.99",
    action: {
      view: "visibility",
      edit: "edit",
      delete: "delete",
    },
  }, {
    id: "#84",
    courseName: "Auditing Awareness",
    category: "Technology",
    instructor: {
      name: "Oliver Khan Auditing Awareness",
    },
    enrolled: 1,
    startDate: "25 Mar 2024",
    endDate: "25 Apr 2024",
    price: "$49.99",
    action: {
      view: "visibility",
      edit: "edit",
      delete: "delete",
    },
  },
]
const snackbar = useSnackbarStore();

async function editItem(item: any) {
  console.log(item.item.instructor.name)

  await snackbar.showSnackbar(" تجربة رسالة ");
}
</script>

<style lang="scss" scoped>
.total-courses-card {
  .courses-card-content {
    h5 {
      font-size: 20px;
      margin-top: 5px;
    }

    .icon {
      width: 77px;
      height: 77px;
      margin: {
        top: 15px;
        bottom: 15px;
      }

      i {
        font-size: 32px;
      }
    }

    .info {
      span {
        font-size: 13px;

        i {
          font-size: 20px;
        }
      }
    }
  }
}

/* Max width 767px */
@media only screen and (max-width: 767px) {
  .total-courses-card {
    .courses-card-content {
      h5 {
        font-size: 18px;
        margin-top: 7px;
      }

      .icon {
        width: 60px;
        height: 60px;
        margin: {
          top: 10px;
          bottom: 10px;
        }

        i {
          font-size: 28px;
        }
      }
    }
  }
}

/* Min width 576px to Max width 767px */
@media only screen and (min-width: 576px) and (max-width: 767px) {
}

/* Min width 768px to Max width 991px */
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .total-courses-card {
    .courses-card-content {
      h5 {
        font-size: 19px;
        margin-top: 7px;
      }

      .icon {
        width: 75px;
        height: 75px;
      }
    }
  }
}

/* Min width 992px to Max width 1199px */
@media only screen and (min-width: 992px) and (max-width: 1199px) {
}

/* Min width 1200px to Max width 1399px */
@media only screen and (min-width: 1200px) and (max-width: 1399px) {
}

/* Min width 1600px */
@media only screen and (min-width: 1600px) {
}

.welcome-card {
  background: linear-gradient(81deg, #605dff 3.39%, #9747ff 93.3%);

  .welcome-card-content {
    padding-right: 130px;
    position: relative;

    .content {
      padding: {
        top: 25px;
        bottom: 25px;
      }

      h5 {
        margin-bottom: 2px;

        span {
          color: #ffe8d4;
        }
      }

      .extra-space {
        margin: {
          top: 35px;
          bottom: 35px;
        }
      }

      .item {
        margin-right: 27px;

        .icon {
          width: 42px;
          height: 42px;
          margin-right: 12px;
        }

        .title {
          font-size: 16px;
        }

        span {
          color: #d5d9e2;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .image {
      top: 50%;
      right: -35px;
      max-width: 285px;
      margin-top: -8px;
      position: absolute;
      transform: translateY(-50%);
    }
  }
}

/* Max width 767px */
@media only screen and (max-width: 767px) {
  .welcome-card {
    .welcome-card-content {
      padding-right: 0;

      .content {
        padding: {
          top: 0;
          bottom: 0;
        }

        h5 {
          margin-bottom: 4px;
        }

        .extra-space {
          margin: {
            top: 15px;
            bottom: 17px;
          }
        }

        .item {
          margin: {
            right: 0;
            bottom: 20px;
          }

          .icon {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }

          .title {
            font-size: 14px;
            margin-bottom: 5px;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .image {
        top: 0;
        right: 0;
        margin-top: 0;
        max-width: 100%;
        position: relative;
        transform: translateY(0);
      }
    }
  }
}

/* Min width 576px to Max width 767px */
@media only screen and (min-width: 576px) and (max-width: 767px) {
  .welcome-card {
    .welcome-card-content {
      padding-right: 185px;

      .image {
        top: 50%;
        right: -20px;
        max-width: 280px;
        position: absolute;
        transform: translateY(-50%);
      }
    }
  }
}

/* Min width 768px to Max width 991px */
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .welcome-card {
    .welcome-card-content {
      padding-right: 220px;

      .content {
        padding: {
          top: 20px;
          bottom: 20px;
        }

        .extra-space {
          margin: {
            top: 22px;
            bottom: 22px;
          }
        }

        .item {
          margin-right: 25px;

          .title {
            font-size: 15px;
          }
        }
      }
    }
  }
}

/* Min width 992px to Max width 1199px */
@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .welcome-card {
    .welcome-card-content {
      padding-right: 250px;

      .image {
        right: -25px;
        max-width: 300px;
      }
    }
  }
}

/* Min width 1200px to Max width 1399px */
@media only screen and (min-width: 1200px) and (max-width: 1399px) {
  .welcome-card {
    .welcome-card-content {
      .image {
        right: -25px;
        max-width: 300px;
      }
    }
  }
}

/* Min width 1600px */
@media only screen and (min-width: 1600px) {
  .welcome-card {
    .welcome-card-content {
      padding-right: 250px;

      .content {
        .item {
          margin-right: 35px;
        }
      }

      .image {
        right: -15px;
      }
    }
  }
}
</style>
