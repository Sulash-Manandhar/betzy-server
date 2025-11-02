import Boom from "@hapi/boom";

export const userService = {
  getAllUsers: async () => {
    try {
      return { message: "User is successfully created" };
    } catch (error) {
      throw error;
    }
  },
};
