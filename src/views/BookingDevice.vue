<template>
  <div class="container mt-4">
    <h2>會議室預約</h2>

    <!-- 選擇會議室類型 -->
    <div class="mb-3">
      <label class="form-label">選擇會議室類型：</label>
      <select
        v-model="selectedRoomType"
        class="form-select"
        @change="fetchRooms"
      >
        <option v-for="type in roomTypes" :key="type.id" :value="type.id">
          {{ type.name }}
        </option>
      </select>
    </div>

    <!-- 選擇會議室 -->
    <div class="mb-3">
      <label class="form-label">選擇會議室：</label>
      <select v-model="selectedRoom" class="form-select">
        <option v-for="room in rooms" :key="room.id" :value="room.id">
          {{ room.name }}
        </option>
      </select>
    </div>

    <!-- 選擇年份 & 月份 -->
    <div class="mb-3 d-flex">
      <input
        v-model="selectedYear"
        type="number"
        class="form-control me-2"
        placeholder="輸入年份"
      />
      <select v-model="selectedMonth" class="form-select">
        <option v-for="month in months" :key="month" :value="month">
          {{ month }} 月
        </option>
      </select>
    </div>

    <!-- 查詢按鈕 -->
    <button class="btn btn-primary" @click="fetchReservations">查詢</button>

    <!-- 預約列表 -->
    <div v-if="reservations.length > 0" class="mt-4">
      <h4>預約列表</h4>
      <table class="table">
        <thead>
          <tr>
            <th>會議室</th>
            <th>日期</th>
            <th>時間</th>
            <th>預約者</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservations" :key="reservation.id">
            <td>{{ reservation.roomName }}</td>
            <td>{{ reservation.date }}</td>
            <td>{{ reservation.time }}</td>
            <td>{{ reservation.user }}</td>
            <td>
              <button
                class="btn btn-warning btn-sm"
                v-if="canEdit(reservation)"
                @click="editReservation(reservation)"
              >
                編輯
              </button>
              <button
                class="btn btn-danger btn-sm"
                v-if="canEdit(reservation)"
                @click="cancelReservation(reservation.id)"
              >
                取消
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 新增預約按鈕 -->
    <button class="btn btn-success mt-3" @click="showModal = true">
      新增預約
    </button>

    <!-- 預約彈出視窗 -->
    <div
      class="modal fade show"
      v-if="showModal"
      style="display: block"
      @click.self="showModal = false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增預約</h5>
            <button class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <label class="form-label">選擇日期：</label>
            <DatePicker v-model="newReservationDate" :min-date="new Date()" />
            <label class="form-label mt-2">選擇時間：</label>
            <select v-model="newReservationTime" class="form-select">
              <option v-for="time in availableTimes" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="createReservation">
              確定預約
            </button>
            <button class="btn btn-secondary" @click="showModal = false">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { DatePicker },
  data() {
    return {
      // 測試用的會議室類型資料
      roomTypes: [
        { id: 1, name: "小型會議室" },
        { id: 2, name: "中型會議室" },
        { id: 3, name: "大型會議室" },
      ],
      // 測試用的會議室資料
      rooms: [
        { id: 101, name: "101 會議室", type: 1 },
        { id: 102, name: "102 會議室", type: 1 },
        { id: 201, name: "201 會議室", type: 2 },
      ],
      // 測試用的預約資料
      reservations: [
        {
          id: 1,
          roomName: "101 會議室",
          date: "2025-03-15",
          time: "10:00",
          user: "我",
        },
        {
          id: 2,
          roomName: "102 會議室",
          date: "2025-03-16",
          time: "14:30",
          user: "Alice",
        },
      ],
      selectedRoomType: 1,
      selectedRoom: 101,
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      showModal: false,
      newReservationDate: null,
      newReservationTime: null,
      availableTimes: ["08:00", "08:30", "09:00", "09:30", "10:00"], // 可擴充
    };
  },
  computed: {
    months() {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    },
  },
  methods: {
    fetchRooms() {
      // TODO: 之後改為 API 呼叫
      this.rooms = this.rooms.filter(
        (room) => room.type === this.selectedRoomType
      );
    },
    fetchReservations() {
      // TODO: 之後改為 API 呼叫
      console.log(
        "查詢預約資料: ",
        this.selectedRoom,
        this.selectedYear,
        this.selectedMonth
      );
    },
    createReservation() {
      // TODO: 之後改為 API 呼叫
      console.log(
        "新增預約: ",
        this.newReservationDate,
        this.newReservationTime
      );
      this.showModal = false;
    },
    cancelReservation(id) {
      // TODO: 之後改為 API 呼叫
      console.log("取消預約: ", id);
      this.reservations = this.reservations.filter((res) => res.id !== id);
    },
    canEdit(reservation) {
      return reservation.user === "我"; // 模擬「只能編輯自己的預約」
    },
  },
};
</script>
