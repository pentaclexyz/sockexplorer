
import React, { useEffect } from 'react';

// Example usage: 

// import {data} from "./tweet-data";
// <div style={{maxWidth: '500px'}}>
//   <Tweet {...data}  />
// </div> 

const TwitterPhotos = ({ photos }) => {
  var slideIndex = 1;

  const showDivs = (n) => {
    var i;
    var x = document.getElementsByClassName('tweet-img__image');
    if (!x.length){ return; }
    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
    }
    x[slideIndex - 1].style.display = 'block';
  };

  const plusDivs = (n) => {
    showDivs((slideIndex += n));
  };

  useEffect(() => {
    showDivs(slideIndex);
  });

  return (
    <>
      <div className="tweet-img__container">
        {photos.map((u, i) => (
          <div
            key={i}
            className="tweet-img__image"
            onClick={() => window.open(u, '_blank')}
            style={{
              backgroundImage: `url(${u})`,
              display: 'none',
              cursor: 'pointer'
            }}
          ></div>
        ))}
        {photos && photos.length > 1 && (
          <button
            className="slide-button slide-display-left"
            onClick={() => plusDivs(-1)}
          >
            &#10094;
          </button>
        )}
        {photos && photos.length > 1 && (
          <button
            className="slide-button slide-display-right"
            onClick={() => plusDivs(+1)}
          >
            &#10095;
          </button>
        )}
      </div>
    </>
  );
};

const Tweet = ({
  username,
  name,
  photos,
  tweet,
  date,
  time,
  link,
  likes_count,
  replies_count,
  retweets_count,
  profile_photo,
}) => {
  return (
    <div className="tweet">
      <div
        style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center' 
        }}
      >
        <img
          style={{
            width: 48,
            height: 48,
            borderRadius: '99999rem',
            marginRight: '2rem',
          }}
          alt={`Twitter Avatar of ${name}`}
          src={profile_photo}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'flex-start',
          }}
        >
          <a
            href={`https://twitter.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '1rem' }}
          >
            <strong style={{ fontSize: '1rem' }}>{name}</strong>
            <br />
            <span>@{username}</span>
          </a>

          <span style={{ marginLeft: 'auto', opacity: '0.5 ' }}>
            {date} {time}
          </span>
        </div>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <p
          style={{
            margin: '0.5rem 0 0.75rem',
            fontSize: '1rem',
            lineHeight: '1.5',
            textDecoration: 'none',
          }}
        >
          {tweet}
        </p>
      </a>

      {photos && <TwitterPhotos photos={photos} />}
    </div>
  );
};

export default Tweet;
