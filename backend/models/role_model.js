import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    permission: Array,
  },
  { timestamps: true }
);

export const Role = mongoose.models?.Role || mongoose.model("Role", roleSchema);
