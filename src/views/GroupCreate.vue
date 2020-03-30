<template>
  <div class="createGroup">
    <h1>Create group</h1>
    <div class="search">
      <searchCmp></searchCmp>
    </div>
    <div class="settings">
      <div class="userpic">
        <p>Photo</p>
        <update-photo></update-photo>
      </div>
      <normalSettingItem
        v-for="(item, index) in createItem"
        :key="index"
        :settingItem="item"
      ></normalSettingItem>
      <div class="submitBtn">
        <button>Create group</button>
      </div>
    </div>
  </div>
</template>

<script>
import searchCmp from '../components/searchCpm.vue';
import normalSettingItem from '../components/normalSettingItem.vue';
import updatePhoto from '../components/uploadAndShowImg.vue';

export default {
  components: {
    searchCmp,
    normalSettingItem,
    updatePhoto,
  },
  data() {
    return {
      createItem: [
        {
          title: 'Name',
          placeholder: 'Group Name',
          maxlength: 25,
        },
        {
          title: 'Topic (optional)',
          placeholder: 'Group Topic',
          maxlength: 25,
        },
        {
          title: 'Description',
          placeholder: 'Group Description',
          maxlength: 50,
        },
      ],
    };
  },
};
</script>

<style scoped>
  .createGroup {
    width: 90%;
    margin: 0 auto;
    text-align: left;
  }

  .createGroup .settings {
    width: 60%;
    margin: 0 auto;
  }

  .settings .userpic {
    text-align: center;
    margin-top: 2.2vh;
  }

  .userpic p {
    text-align: left;
    color: #888;
  }

  .settings .submitBtn {
    width: 100%;
    height: 5vh;
    display: flex;
  }

  .submitBtn button {
    width: 48%;
    height: 5vh;
    margin: 0 auto;
    margin-top: 7vh;
    border: none;
    color: white;
    font-size: 15px;
    background-color: rgb(1,113,245);
    cursor: pointer;
  }
</style>
