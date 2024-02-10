import mongoose from "mongoose";
// mongoose.set("debug", true);
export const connectDB = async () => {
  try {
    const URI_MONGO = process.env.URI_MONGO;
    await mongoose.connect(`${URI_MONGO}`);
    console.log(
      `MongoDB Connected!!!`
    );
  } catch (error) {
    console.log("dbConnect error",error);
    process.exit(1);
  }
};

export default connectDB