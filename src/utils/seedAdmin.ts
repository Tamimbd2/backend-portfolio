import { User } from "../module/auth/user.model";

const seedAdmin = async () => {
    const isExists = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (isExists) {
        console.log("Admin already exists");
        return;
    }

    const admin = await User.create({
        name: "Mahabub Tamim",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    });
    console.log("admin create success", admin);
};


export default seedAdmin;