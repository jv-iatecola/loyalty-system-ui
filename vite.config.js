import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        index: 'src/index.html',
        createAccount: 'src/create-account.html',
        createStore: 'src/create-store.html',
        login: 'src/login.html',
        profile: 'src/profile.html',
        resendEmail: 'src/resend-validation-email.html',
        storeVoucherList: 'src/store-voucher-list.html',
        userStoreList: 'src/user-store-list.html',
        userVoucherList: 'src/user-voucher-list.html'
      }
    },
  },
})
