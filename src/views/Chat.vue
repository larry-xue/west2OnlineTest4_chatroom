<template>
<div>
    <twemoji-textarea
    :emojiData="emojiDataAll"
    :emojiGroups="emojiGroups"
    :enableSendBtn="true"
    :maxlength="200"
    :searchEmojisFeat="true"
    @enterKey="onEnterKey">
  </twemoji-textarea>
</div>
</template>

<script>
import { TwemojiTextarea } from '@kevinfaguiar/vue-twemoji-picker';
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh-hant/emoji-all-groups.json';
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';

export default {
  name: 'App',
  components: {
    'twemoji-textarea': TwemojiTextarea,
  },
  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    },
  },
  methods: {
    onEnterKey(e) {
      console.log('ClickedEnter', e);
    },
  },
};
</script>

<style scoped>
twemoji-textarea {
  width: 60vw;
}
</style>
