"use strict";

import { logger } from "../utils/logger.js";

const response = (values, res) => {
    if (values) {
        res.status(200).send(
            typeof values == "object" ? values : values.toString()
        );
        logger.info(JSON.stringify(values));
    } else {
        res.status(200).send(false);
    }
};

export default response;
