<template>
  <div>
    <router-view></router-view>

    <app-header></app-header>
    <button class="btn btn-dark" v-on:click="isFormVisible = !isFormVisible">
      Add Task
    </button>
    <app-form v-if="isFormVisible" v-on:addTask="updateTask($event)"></app-form>

    <div id="todos">
      <app-edit
        v-bind:editId="editId"
        v-if="editId"
        v-on:editTask="editTask($event)"
      ></app-edit>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Role</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in jobs" :key="job.id">
            <td>{{ job.job_id }}</td>
            <td>{{ job.company_name }}</td>
            <td>{{ job.role }}</td>
            <td>{{ job.location }}</td>
            <td>
              <button class="btn btn-danger" v-on:click="del(job.job_id)">
                Delete
              </button>
              <button class="btn btn-primary" v-on:click="editId = job.job_id">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>