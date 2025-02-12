import AuthService from "@/services/auth";
import { IAuthController } from "@/types/auth";
import { asyncController } from "@/utils/handlers";

class AuthController implements IAuthController {
  constructor(private service: AuthService) {}

  login = asyncController(async (req, res) => {
    const { email, password } = req.body;

    const { token } = await this.service.login(email, password);

    return res.status(200).json({
      token: token,
      status: true,
      message: "successful Login !",
    });
  });
}

export default AuthController;
