import React, { useState, useEffect} from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams} from 'react-router-dom';
import { v4 as uuid} from 'uuid';

import { client, urlFor } from '../client';
import  MasonryLayout from '../components/MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/Data' ;
import Spinner from '../components/Spinner';


const PinDetail = ({user}) => {

  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [addingComment, setaddingComment] = useState(null);
  const {pinId} = useParams();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if(query) {
      client.fetch(query)
      .then((data) => {
        setPinDetail(data[0]);

        if(data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query)
          .then((res) => setPins(res));
        }
      })
    }
  }
  useEffect(() => {
    fetchPinDetails();
  }, [pinId])


  if (!pinDetail) {
    return (
      <Spinner message="Loading pin" />
    );
  }

  
  return(
    <div className="flex lg:flex-row flex-col m-auto bg-white"
     style={{maxWidth:'1500px', borderRadius:'32px'}}>
      <div className="flex justify-center items-center md:items-start flex-initial">
         <img src={pinDetail?.image && urlFor(pinDetail.image).url()}
          alt="user-post" className='rounded-t-3xl rounded-b-lg' />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
          <a
                  href={`${pinDetail.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><MdDownloadForOffline />
                </a>
           </div>
           <a href={pinDetail.destination}
            target='_blank' rel='noreferrer'>{pinDetail.destination}</a>
        </div>
        <div>
          <h1 className="text-4xl font-bold break-words mt-2">
            {pinDetail.title}
          </h1>
          <p className="mt-3">
            {pinDetail.about}
          </p>
          
        </div>
        <Link to={`/user-profile/${pinDetail?.postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={pinDetail?.postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{pinDetail?.postedBy?.userName}</p>
      </Link>
      </div>
    </div>
  
  )
}

  


  

export default PinDetail
