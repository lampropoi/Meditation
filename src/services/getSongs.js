const getSongs = async () => {
  const spreadsheetId = '1idhqDqTuHCdesw0A9op4l322OOtGW7dhgIDy03MWae0';
  const response = await fetch(`https://api.graphqlsheet.com/api/${spreadsheetId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: '9f5589dbce602ded17a9fff4e3ce3d54999376cc'
    },
    body: JSON.stringify({
      query: `
        {
          get {
            id
            title
            image
            description
            descriptionfull
            duration
            file
          }
        }
      `
    })
  });
  const responseJSON = await response.json();
  return responseJSON && responseJSON.data && responseJSON.data.get && responseJSON.data.get;
};

export default getSongs;
