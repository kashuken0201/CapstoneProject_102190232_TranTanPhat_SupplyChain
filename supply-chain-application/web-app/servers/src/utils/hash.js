import crypto from "crypto";

const hashData = async (data) => {
    return await crypto.createHash("sha256").update(data.toString()).digest("hex");
};

export default {
    hashData,
};
