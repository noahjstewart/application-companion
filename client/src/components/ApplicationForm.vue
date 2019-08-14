<template>
  <form @submit.prevent="onSubmit">
    <label>
      Company Name
      <input type="text" v-model="form.company" placeholder="Company">
      <span v-if="!companyExists">Company name required</span>
    </label><br>
    <label>
      Position Title
      <input type="text" v-model="form.position" placeholder="Position">
      <span v-if="!positionExists">Position title required</span>
    </label><br>
    <label>
      Listing URL
      <input type="text" v-model="form.listing_url" placeholder="Listing URL">
    </label><br>
    <label>
      Applied At
      <input type="date" v-model="form.applied_at" :placeholder="Date.now()">
      <span v-if="!appliedAtExists">Applied at date required</span>
    </label><br>
    <label>
      Notes
      <input type="textarea" v-model="form.notes" placeholder="Any notes, keywords, etc">
    </label><br>
    <label>
      Response?
      <input type="checkbox" v-model="form.response">
    </label><br>
    <label>
      Interview?
      <input type="checkbox" v-model="form.interview">
    </label><br>
    <label>
      Offer?
      <input type="checkbox" v-model="form.offer">
    </label><br>
    <label>
      Accepted?
      <input type="checkbox" v-model="form.accepted">
    </label><br>
    <input type="submit" :value="editing ? 'Save' : 'Create'">
  </form>
</template>

<script>
import Button from '@/components/user_interface/Button.vue';
import { Mixins } from '@/mixins.js';

export default {

  components: {
    'custom-button': Button
  },

  mixins: [
    Mixins
  ],
  
  props: {
    editing: {
      type: Boolean,
      required: false,
      default: false
    },

    application: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      form: {
        company: '',
        position: '',
        listing_url: '',
        applied_at: null,
        notes: '',
        response: false,
        interview: false,
        offer: false,
        accepted: false
      }
    }
  },

  computed: {

    companyExists() {
      return this.form.company.length > 0;
    },

    positionExists() {
      return this.form.position.length > 0;
    },

    appliedAtExists() {
      return this.form.applied_at !== null;
    }
    
  },

  created() {
    this.setEditing();
  },

  methods: {

    setEditing() {
      if (this.editing) {
        this.form = JSON.parse(JSON.stringify(this.application));
        let appliedAt = new Date(this.form.applied_at);
        this.form.applied_at = `${appliedAt.getFullYear()}-${this.determineMonth(appliedAt)}-${this.determineDate(appliedAt)}`;
      }
    },

    onSubmit() {
      if (!this.companyExists || !this.positionExists || !this.appliedAtExists) {
        alert('fill out required fields');
      } else {
        this.$emit('onSubmit', this.form);
      }
    }
    
  },

  watch: {

    editing() {
      this.setEditing();
    }
    
  }
  
}
</script>

<style scoped>
form {
  background-color: #eeeeee;
  padding: 2vh 4vw;
  color: #393e46;
  border-radius: 2px;
  box-shadow: 0px 10px 18px -7px black;
}

input[type=text] {
  padding: 3px 6px;
  border-radius: 2px;
}

label {
  margin-bottom: 10px;
}
</style>