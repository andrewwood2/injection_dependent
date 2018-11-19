export default {
  get: jest.fn(key => {
    return new Promise(resolve =>
      resolve(
        {returnData:[
            {
                "id": 5,
                "site": "{\"part\":\"Thigh\",\"side\":\"Left\",\"quadrant\":1,\"active\":true,\"imgNum\":0}",
                "time": "1539765000000.0",
                "medtype": "short",
                "created_at": "2018-11-16T12:04:45.676Z",
                "updated_at": "2018-11-16T12:04:45.676Z",
                "user_id": 7
            }
        ]}
      )
    )
  }),
  post: jest.fn(key => {
    return new Promise(resolve =>
      resolve("Hello")
    )
  }),
  delete: jest.fn(key => {
    return new Promise(resolve =>
      resolve("Hello")
    )
  }),
};
