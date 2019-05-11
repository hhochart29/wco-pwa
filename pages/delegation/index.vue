<template>
  <div class="wcocontainer">
    Page de délégation
  </div>
</template>

<script>
export default {
  name: 'Delegation',
  asyncData () {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, 1000)
    })
  }
}
</script>
