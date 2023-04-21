<script lang="ts" setup>

</script>

<template>
  <section class="d-flex justify-content-center align-items-center" style="height: 90vh;">
    <div class="card" style="width: 50em;">
      <div class="card-body">
        <h2 class="card-title mt-0">Settings</h2>
        <form>
          <h4 class="card-subtitle mb-2 text-muted">Anypoint Platform</h4>
          <div class="form-group row">
            <label for="inputClientID" class="col-3 col-form-label col-form-label-sm">Client ID</label>
            <div class="col-9 pr-2">
              <input type="text" class="form-control form-control-sm" id="inputClientID" placeholder="Client ID" maxlength="32">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputClientSecret" class="col-3 col-form-label col-form-label-sm">Client Secret ID</label>
            <div class="col-9 pr-2">
              <input type="text" class="form-control form-control-sm" id="inputClientSecret" placeholder="Client Secret" maxlength="32">
            </div>
          </div>
          <h4 class="card-subtitle mb-2 mt-3 text-muted">GoCD <small>(Optional)</small></h4>
          <div class="form-group row">
            <label for="inputGoCDURL" class="col-3 col-form-label col-form-label-sm">Domain</label>
            <div class="col-9 pr-2">
              <input type="text" class="form-control form-control-sm" id="inputGoCDURL" placeholder="Domain" maxlength="100">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputToken" class="col-3 col-form-label col-form-label-sm">Access Tokens</label>
            <div class="col-9 pr-2">
              <input type="text" class="form-control form-control-sm" id="inputToken" placeholder="Personal Access Tokens" maxlength="32">
            </div>
          </div>
          <div class="form-group row justify-content-end mt-5">
            <div class="col-auto">
              <button type="button" class="btn btn-primary">Authication</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  animation: card 15s infinite forwards cubic-bezier(0.65, 0.05, 0.36, 1);
  background: rgba(32,33,34,0.8);
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: block;
}

@supports (backdrop-filter: blur(6px)) {
  .card {
    background:rgba(0,0,0,0.1);
    backdrop-filter: blur(6px)
  }
}

@media (max-width: 920px) {
  .card {
    max-width:400px
  }
}

</style>
