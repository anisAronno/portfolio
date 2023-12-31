import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user')),
      sidebarOpen: !!localStorage.getItem('sidebarOpen')
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    },

    sidebarOpen(state) {
      return state.sidebarOpen
    },

    user(state) {
      if (!state.isAuthenticated) {
        return null
      }

      return state.user
    }
  },

  mutations: {
    authenticate(state, payload) {
      state.isAuthenticated = true
      localStorage.setItem('token', payload.token)

      state.user = {
        id: payload.user.id,
        name: payload.user.name,
        username: payload.user.username,
        email: payload.user.email,
        role: payload.user.role,
        image: payload.user.image,
        created_at: payload.user.created_at
      }

      localStorage.setItem('user', JSON.stringify(state.user))
    },

    sidebarOpen(state, payload) {
      state.sidebarOpen = true
      localStorage.setItem('sidebarOpen', payload)
    },

    logout(state) {
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    updateUser(state, payload) {
      localStorage.removeItem('user')
      state.user = {
        id: payload.user.id,
        name: payload.user.name,
        username: payload.user.username,
        email: payload.user.email,
        role: payload.user.role,
        image: payload.user.image,
        created_at: payload.user.created_at
      }
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  },

  actions: {
    login(context, payload) {
      context.commit('authenticate', payload)
    },

    sidebarOpen(context, payload) {
      context.commit('authenticate', !payload)
    },

    logout(context) {
      context.commit('logout')
    },

    updateUser(context, payload) {
      context.commit('updateUser', payload)
    }
  }
})

export default store
