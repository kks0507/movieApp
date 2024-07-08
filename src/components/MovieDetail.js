import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

// MovieDetail 컴포넌트 정의
function MovieDetail(props) {
  const { movie } = props; // props에서 movie 객체를 가져옴
  const [videos, setVideos] = useState([]); // 비디오 클립을 저장할 상태 변수

  // 컴포넌트가 마운트될 때 및 movie.id가 변경될 때 실행
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
      params: {
        api_key: '9d2bff12ed955c7f1f74b83187f188ae', // 영화 DB API 키
        language: 'en-US' // 언어 설정
      }
    })
    .then(response => setVideos(response.data.results)) // 비디오 클립 데이터를 상태 변수에 저장
    .catch(error => console.error("Error fetching the videos", error)); // 오류 발생 시 콘솔에 출력
  }, [movie.id]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <h2>{movie.title}</h2> // 영화 제목
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> // 영화 포스터
      <p>{movie.overview}</p> // 영화 시놉시스
      {videos.map(video => (
        video.site === 'YouTube' ? (
          <YouTube 
            key={video.id} 
            videoId={video.key} 
            opts={opts} 
            onError={(event) => console.error('YouTube Player Error', event)} // 플레이어 오류 처리
            onReady={(event) => event.target.playVideo()} // 플레이어가 준비되면 비디오 재생
          />
        ) : null
      ))}
    </div>
  );
}

// PropTypes를 사용하여 movie prop의 타입을 정의하고 필수로 지정
MovieDetail.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieDetail;

