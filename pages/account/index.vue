<template>
  <div>
    <h1>Bienvenue sur la page de votre compte</h1>
    <h2>Récapitulatif de vos informations</h2>
  </div>
</template>

<script>
export default {
  name: 'account',
  asyncData () {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, 800)
    })
  }
}
</script>
