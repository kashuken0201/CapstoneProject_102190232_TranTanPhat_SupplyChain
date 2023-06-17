import crypto from "crypto";

const hashData = (data) => {
    return crypto.createHash("sha256").update(data.toString()).digest("hex");
};

export default {
    hashData,
};
