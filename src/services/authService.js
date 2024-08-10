import axios from "axios";
import Cookies from "js-cookie";

class AuthService {
  login(email, password) {
    return axios
      .post("http://185.86.155.254:5136/api/auth", {
        tenantCode: "BALLIPINAR",
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          // Access token'ı cookie'ye kaydediyoruz
          Cookies.set("accessToken", response.data.accessToken);
        }
        return response.data;
      });
  }

  logout() {
    // Çıkış yaparken cookie'yi siliyoruz
    Cookies.remove("accessToken");
  }

  getCurrentUser() {
    // Kullanıcı bilgilerini cookie'den okuyoruz
    const token = Cookies.get("accessToken");
    return token ? { accessToken: token } : null;
  }
}

export default new AuthService();
