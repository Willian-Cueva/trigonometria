import mongoose from "mongoose";

const Ejecrcicio_Model_Schema = new mongoose.Schema({
  title:{
    type: String,
    require: true
  },
  type:{
    type: String,
    require: true
  },
  steps:{
    type: [String],
    require: true
  }
})

export default mongoose.models.Ejercicio || mongoose.model("Ejercicio", Ejecrcicio_Model_Schema)