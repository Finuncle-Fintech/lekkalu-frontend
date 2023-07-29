import { pickBy } from 'lodash';

const helperUtils = {
  createFilterUrlString: (params: any) => {
    const validParams = pickBy(params, (value: any) => !!value);
    const url = Object.entries(validParams)
      .map((e) => e.join('='))
      .join('&');
    return url;
  },
};

export default helperUtils;
