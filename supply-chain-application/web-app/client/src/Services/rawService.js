import { baseService } from "./baseService";

export class RawService extends baseService {
  constructor() {
    super("");
  }

  getRawsService = () => {
    return this.get(`raws`);
  };

  createRawService = (raw) => {
    return this.post(`raws/create`, { raw_name: raw });
  };

  orderRaw = (rawId) => {
    return this.post(`raws/${rawId}/order`);
  };

  supplyRaw = (rawId) => {
    return this.post(`raws/${rawId}/supply`);
  };
}

export const rawService = new RawService();
