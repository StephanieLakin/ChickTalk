export const categories = [
    {
      name: 'Getting Started',
      image: 'https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_1280.jpg',
    },
    {
      name: 'Breeds',
      image: 'https://cdn.pixabay.com/photo/2019/05/16/19/26/chickens-4207939_1280.jpg',
    },
    {
      name: 'Roosters',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/05/32/rooster-1867562_1280.jpg',
    },
    {
      name: 'Feed & Seed',
      image: 'https://cdn.pixabay.com/photo/2020/10/10/12/28/hen-5642953_1280.jpg',
    }, 
    {
      name: 'Coops & Runs',
      image: 'https://cdn.pixabay.com/photo/2020/10/27/15/21/chicken-5691062_1280.jpg',
    },   
    {
      name: 'Laying',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/05/25/chicken-1867521_1280.jpg',
    },
    {
      name: 'Eggs',
      image: 'https://cdn.pixabay.com/photo/2016/07/11/19/40/eggs-1510449_1280.jpg',
    },    
    {
      name: 'Predators',
      image: 'https://cdn.pixabay.com/photo/2020/03/01/15/30/fox-4893199_1280.jpg',
    }, 
    {
      name: 'Health & wellness',
      image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
    },      
    {
      name: 'Chicken Art',
      image: 'https://cdn.pixabay.com/photo/2017/08/21/20/38/tapestry-2666839_1280.jpg',
    }, 
    {
      name: 'Quotes & Poems',
      image: 'https://cdn.pixabay.com/photo/2020/03/30/17/12/sutterlin-4984882_1280.jpg',
    },
     {
      name: 'Memes and Humor',
      image: 'https://pbs.twimg.com/media/C6VRG9eWUAEER5o.jpg',
    },     
    {
      name: 'Products',
      image: 'https://www.popsci.com/uploads/2022/12/01/Chicken-Swing-DIY-Project.jpeg?auto=webp&width=1440&height=810',
    },
  ];


   

 // sanity query to get document == to type user and _id is equal to id
 export const UserQuery = (userId) => {
      const query = `*[_type == "user" && _id == '${userId}']`;
      return query;
    };
    // **  see sanity query documentation

 
export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};