import React from 'react';
import PropTypes from 'prop-types';
import MovieDetail from './MovieDetail';

// MovieList 컴포넌트 정의
function MovieList(props) {
  const { movies } = props; // props에서 movies 배열을 가져옴
  return (
    <div>
      {movies.map((movie) => (
        <MovieDetail key={movie.id} movie={movie} /> // 각 영화를 MovieDetail 컴포넌트에 전달하여 렌더링
      ))}
    </div>
  );
}

// PropTypes를 사용하여 movies prop의 타입을 정의하고 필수로 지정
MovieList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MovieList;
