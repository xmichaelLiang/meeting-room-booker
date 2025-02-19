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

    <!-- 選擇預約的開始日期和結束日期 -->
    <!-- 選擇預約的開始日期和結束日期 -->
    <div class="mb-3">
      <label class="form-label">選擇預約開始日期：</label>
      <DatePicker
        v-model="startDate"
        :min-date="new Date()"
        :enable-time-picker="false"
        format="yyyy-MM-dd"
        placeholder="選擇開始日期"
      />

      <label class="form-label mt-2">選擇預約結束日期：</label>
      <DatePicker
        v-model="endDate"
        :min-date="startDate || new Date()"
        :enable-time-picker="false"
        format="yyyy-MM-dd"
        placeholder="選擇結束日期"
      />
    </div>

    <!-- 顯示選擇的日期範圍 -->
    <div v-if="startDate && endDate" class="alert alert-info">
      已選擇的日期範圍：{{ startDate }} ~ {{ endDate }}
    </div>

    <!-- 查詢按鈕 -->
    <button class="btn btn-primary" @click="fetchReservations">查詢</button>

    <!-- 預約列表 (模擬資料) -->
    <div v-if="reservations.length > 0" class="mt-4">
      <h4>預約列表</h4>
      <table class="table">
        <thead>
          <tr>
            <th>會議室</th>
            <th>日期</th>
            <th>時間</th>
            <th>預約者</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservations" :key="reservation.id">
            <td>{{ reservation.roomName }}</td>
            <td>{{ reservation.date }}</td>
            <td>{{ reservation.time }}</td>
            <td>{{ reservation.user }}</td>
          </tr>
        </tbody>
      </table>
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
      roomTypes: [
        { id: 1, name: "小型會議室" },
        { id: 2, name: "中型會議室" },
        { id: 3, name: "大型會議室" },
      ],
      rooms: [
        { id: 101, name: "101 會議室", type: 1 },
        { id: 102, name: "102 會議室", type: 1 },
        { id: 201, name: "201 會議室", type: 2 },
      ],
      selectedRoomType: 1,
      selectedRoom: 101,
      startDate: new Date(), // 預設今天
      endDate: this.getDefaultEndDate(), // 預設一個月後
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
    };
  },
  methods: {
    getDefaultEndDate() {
      const today = new Date();
      const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
      return nextMonth;
    },
    fetchRooms() {
      console.log("根據類型獲取會議室：", this.selectedRoomType);
    },
    fetchReservations() {
      if (!this.startDate || !this.endDate) {
        alert("請選擇開始和結束日期！");
        return;
      }
      console.log(
        "查詢預約資料: ",
        this.startDate,
        this.endDate,
        this.selectedRoom
      );
    },
  },
};
</script>
