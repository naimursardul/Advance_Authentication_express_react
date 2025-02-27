import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    method: String,
    route: String,
  },
  { timestamps: true }
);

export const Permission =
  mongoose.models?.Permission || mongoose.model("Permission", permissionSchema);
