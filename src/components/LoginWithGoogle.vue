<template>
  <div>
    <button v-if="!user" @click="signInWithGoogle">Iniciar Sesión con Google</button>
    <div v-else>
      <p>{{ user.email }}</p>
      <button @click="signOut">Logout</button>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

export default defineComponent({
  name: 'LoginWithGoogle',
  setup() {
    const user = ref(null);

    onMounted(() => {
      onAuthStateChanged(auth, (u) => {
        user.value = u;
      });
    });

    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error(error);
      }
    };

    const signOut = () => {
      auth.signOut();
    };

    return { user, signInWithGoogle, signOut };
  }
});
</script>