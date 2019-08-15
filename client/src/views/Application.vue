<template>
  <div class="application-container" v-if="!applicationLoading">
    <p class="sm-text margin-t0 margin-b0 application-for">Application for:</p>
    <div class="application-header">
      <h1>{{ application.position }} @ {{ application.company }}</h1>
      <custom-button
        :msg="editing ? 'Cancel' : 'Edit Application'"
        @btnClicked="editing ? cancelEdit() : editApplication()">
        <span slot="icon">
          <i :class="editing ? 'fa fa-ban' : 'fa fa-pencil'" aria-hidden="true"></i>
        </span>
      </custom-button>
    </div>
    <div class="application-view" v-if="!editing">
      <div class="title-comp-name light-back-with-shadow rounded padded">
        <p class="bold">Position Title</p>
        <p style="margin-bottom: 10px;">{{ application.position }}</p>
        <p class="bold">Company Name</p>
        <p>{{ application.company }}</p>
      </div>
      <div class="listing-box padded light-back-with-shadow rounded">
        <p class="bold">Link to Listing</p>
        <a v-if="application.listing_url" class="listing-url" target="_blank">
          <i class="fa fa-external-link" aria-hidden="true"></i>
          {{ application.listing_url }}
        </a>
        <p v-else><i>URL not included yet</i></p>
      </div>
      <div class="applied-notes padded light-back-with-shadow rounded">
        <p class="bold">Date Applied</p>
        <p style="margin-bottom: 10px;">{{ application.applied_at | formatDate }}</p>
        <p class="bold">Notes</p>
        <p v-if="application.notes.trim().length">{{ application.notes }}</p>
        <p v-else><i>No notes added yet</i></p>
      </div>
      <div class="checkboxes padded light-back-with-shadow rounded">
        <span>
          <p class="bold">Response?</p>
          <p v-if="application.response" style="margin-bottom: 10px;">Yes</p>
          <p v-else style="margin-bottom: 10px;">No</p>
        </span>
        <span>
          <p class="bold">Response?</p>
          <p v-if="application.response" style="margin-bottom: 10px;">Yes</p>
          <p v-else style="margin-bottom: 10px;">No</p>
        </span>
        <span>
          <p class="bold">Response?</p>
          <p v-if="application.response" style="margin-bottom: 10px;">Yes</p>
          <p v-else style="margin-bottom: 10px;">No</p>
        </span>
        <span>
          <p class="bold">Response?</p>
          <p v-if="application.response" style="margin-bottom: 10px;">Yes</p>
          <p v-else style="margin-bottom: 10px;">No</p>
        </span>
        <!-- <p class="bold">Interview?</p>
        <p v-if="application.interview">Yes</p>
        <p v-else>No</p>
        <p class="bold">Offer?</p>
        <p v-if="application.offer">Yes</p>
        <p v-else>No</p>
        <p class="bold">Accepted?</p>
        <p v-if="application.accepted">Yes</p>
        <p v-else>No</p> -->
      </div>
      <custom-button
        class="btn-delete"
        msg="Delete"
        @btnClicked="deleteApplication">
        <span slot="icon">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </span>
      </custom-button>
    </div>
    <div class="edit-view" v-else>
      <application-form
        :editing="editing"
        :application="applicationClone"
        @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from '@/components/user_interface/Button.vue';
import ApplicationForm from '@/components/ApplicationForm.vue';

export default {

  components: {
    'custom-button': Button,
    'application-form': ApplicationForm
  },

  data() {
    return {
      loading: false,
      editing: false,
      applicationClone: {}
    }
  },

  computed: {

    ...mapGetters({
      getApplication: 'getApplicationById'
    }),

    application() {
      return this.getApplication(this.$route.params.id);
    },

    applicationLoading() {
      return this.application === undefined || this.application === null;
    }
    
  },

  methods: {

    ...mapActions({
      updateApplication: 'updateApplication',
      removeApplication: 'deleteApplication'
    }),

    cancelEdit() {
      this.editing = false;
      this.applicationClone = JSON.parse(JSON.stringify(this.application));
    },

    editApplication() {
      this.applicationClone = JSON.parse(JSON.stringify(this.application));
      this.applicationClone = {
        company: this.applicationClone.company,
        position: this.applicationClone.position,
        listing_url: this.applicationClone.listing_url,
        applied_at: this.applicationClone.applied_at,
        notes: this.applicationClone.notes,
        response: this.applicationClone.response,
        interview: this.applicationClone.interview,
        offer: this.applicationClone.offer,
        accepted: this.applicationClone.accepted
      }
      this.editing = true;
    },

    onSubmit(form) {
      this.loading = true;
      form.id = this.$route.params.id;
      this.updateApplication(form)
        .then(res => this.editing = false )
        .catch(e => alert(e.message))
        .finally(() => { this.loading = false });
    },

    deleteApplication() {
      this.loading = true;
      let conf = confirm("Are you sure you want to delete this application?");
      if (conf) {
        this.removeApplication(this.$route.params.id)
          .then(() => { this.$router.push({ name: 'home' }) })
          .catch(e => console.log(e))
          .finally(() => this.loading = false);
      }
    }
  }

}
</script>

<style scoped>
.application-container {
  position: relative;
  width: 100%;
}

.application-view {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: auto;
  grid-template-areas:
    "title-comp applied-notes"
    "listing applied-notes"
    "checkboxes checkboxes"
    "delete delete";
  column-gap: 20px;
  row-gap: 20px;
}

.application-for {
  position: absolute;
  top: 10px;
  left: 3px;
}

.application-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.title-comp-name {
  grid-area: title-comp;
}

.listing-box {
  grid-area: listing;
}

.listing-url {
  text-decoration: none;
}

.listing-url:hover {
  cursor: pointer;
  color: #00adb5;
}

.applied-notes {
  grid-area: applied-notes;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.checkboxes {
  grid-area: checkboxes;
}

p {
  margin-top: 0;
  margin-bottom: 0;
}

.btn-delete {
  grid-area: delete;
  background-color: #ff6768;
  color: #eeeeee;
}

.btn-delete:hover {
  background-color: rgb(214, 75, 75);
  border-color: rgb(214, 75, 75);
}

@media (max-width: 415px) {

  .application-for {
    display: none;
  }

  .application-header {
    margin-bottom: 20px;
  }

  .application-view {
    display: block;
  }

  .padded {
    margin-bottom: 20px;
  }

  .btn-delete {
    width: 100%;
  }
  
}
</style>