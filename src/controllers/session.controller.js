import { UserDTO } from "../dto/user.dto.js";

export const currentUser = async (req, res) => {

  const userDTO = new UserDTO(req.user);

  res.json({
    user: userDTO
  });

};