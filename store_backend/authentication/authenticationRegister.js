const Joi = require("joi");
module.exports = {
  authencationRegister: async (
    username,
    email,
    password,
    repassword,
    address,
    numberphone,
    role
  ) => {
    const schema = Joi.object({
      username: Joi.string().min(5).max(39).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {
          allow: ["com", "net"],
        },
      }),
      password: Joi.string(),
      repassword: repassword ? Joi.ref("password") : password,
      address: Joi.string().min(5).max(39).required(),
      numberphone: Joi.string().min(5).max(39).required(),
      role: Joi.string(),
    });
    try {
      const value = await schema.validateAsync({
        username,
        email,
        password,
        repassword,
        address,
        numberphone,
        role,
      });
      return value;
    } catch (error) {
      return error;
    }
  },
};
