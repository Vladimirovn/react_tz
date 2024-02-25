import makeApiRequest from "./apiService";

const apiController = {
    
  getIds: async (offset, limit) => {
    const requestData = {
      action: 'get_ids',
      params: { 'offset': offset, 'limit': limit }
    };
    return await makeApiRequest(requestData);
  },

  getItems: async (ids) => {
    const requestData = {
      action: 'get_items',
      params: { 'ids': ids }
    };
    return await makeApiRequest(requestData);
  },

  getFields: async (field, offset, limit) => {
    const requestData = {
      action: 'get_fields',
      params: { 'field': field, 'offset': offset, 'limit': limit }
    };
    return await makeApiRequest(requestData);
  },

  filter: async (field, value) => {
    const requestData = {
      action: 'filter',
      params: { [field]: value }
    };
    return await makeApiRequest(requestData);
  }
};

export default apiController;