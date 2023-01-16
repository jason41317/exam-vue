import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    login(data) {
      return this.$http.post(`${apiPrefix}/${apiVersion}/login`, data);
    },
    getAuthenticatedUser() {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/me`);
    },
    revokeAuthentication() {
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/logout`);
    },
    register(data) {
      return this.$http.post(`${apiPrefix}/${apiVersion}/register`, data);
    },
    verifyEmail(params) {
      return this.$http.get(`${apiPrefix}/${apiVersion}/email-verification`, { params: params });
    },
    resendVerificationEmail(params) {
      return this.$http.get(`${apiPrefix}/${apiVersion}/resend-email-verification`, { params: params});
    },
    googleLogin(params) {
      return this.$http.get(`${apiPrefix}/${apiVersion}/auth/google`, { params: params});
    },
    googleCallback(params) {
      return this.$http.get(`${apiPrefix}/${apiVersion}/auth/google/callback`, { params: params});
    }
  }
}