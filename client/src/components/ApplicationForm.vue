<template>
  <form @submit.prevent="onSubmit">
    <label class="required-label">
      Company Name<span class="red">*</span>
      <transition name="slide" appear>
        <p v-show="attemptedSubmitNoCompany" class="red sm-text required-text">Required</p>
      </transition>
      <input type="text" v-model="form.company" placeholder="Company">
    </label><br><br>
    <label class="required-label">
      Position Title<span class="red">*</span>
      <transition name="slide" appear>
        <p v-show="attemptedSubmitNoPosition" class="red sm-text required-text">Required</p>
      </transition>
      <input type="text" v-model="form.position" placeholder="Position">
    </label><br><br>
    <label>
      Listing URL
      <input type="text" v-model="form.listing_url" placeholder="Listing URL">
    </label><br><br>
    <label class="required-label">
      Applied At<span class="red">*</span>
      <transition name="slide" appear>
        <p v-show="!appliedAtExists && attemptedSubmitNoAppliedAt" class="red sm-text required-text">Required</p>
      </transition>
      <input type="date" v-model="form.applied_at">
    </label><br><br>
    <label>
      Notes
      <input type="textarea" v-model="form.notes" placeholder="Any notes, keywords, etc">
    </label><br><br>
    <div class="checkboxes">
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
    </div>
      <custom-button
        class="btn-submit"
        :msg="editing ? 'Save' : 'Create'"
        :inverted="true"
        @btnClicked="onSubmit"/>
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
      },
      attemptedSubmitNoCompany: false,
      attemptedSubmitNoPosition: false,
      attemptedSubmitNoAppliedAt: false
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
      return this.form.applied_at !== null && this.form.applied_at !== "";
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

    onSubmit(e) {
      e.preventDefault();
      if (!this.companyExists || !this.positionExists || !this.appliedAtExists) {
        if (!this.companyExists) this.attemptedSubmitNoCompany = true;
        if (!this.positionExists) this.attemptedSubmitNoPosition = true;
        if (!this.appliedAtExists) this.attemptedSubmitNoAppliedAt = true;
      } else {
        this.attemptedSubmitNoCompany = false;
        this.attemptedSubmitNoPosition = false;
        this.attemptedSubmitNoAppliedAt = false;
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
  border-radius: 4px;
  box-shadow: 0px 10px 18px -7px black;
}

label {
  margin-bottom: 1rem;
}

input {
  z-index: 10;
}

input[type=text], input[type=textarea], input[type=date] {
  width: 100%;
  padding: 3px 6px;
  border: 1px solid #c9d6df;
  border-radius: 3px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  transition: border-color 0.3s;
  outline: none;
  border-color: #232931;
}

.checkboxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.checkboxes br {
  display: none;
}

.red {
  color: #ff6768;
}

.sm-text {
  font-size: .75rem;
  margin: 0;
}

.required-label {
  position: relative;
}

.required-text {
  position: absolute;
  top: 45px;
  left: 2px;
}

.btn-submit {
  width: 100%;
}

.slide-enter-to {
  transition: all 0.2s;
}

.slide-leave-to, .slide-enter {
  transition: all 0.2s;
  transform: translateY(-20px);
}

@media (max-width: 767px) {
  .checkboxes {
    display: block;
  }

  .checkboxes br {
    display: block;
  }

  .btn-submit {
    margin-top: 10px;
  }
}
</style>