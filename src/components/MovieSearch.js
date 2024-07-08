import React, { useState } from 'react';
import axios from 'axios';
import MovieList from './MovieList';

// MovieSearch 컴포넌트 정의
function MovieSearch() {
  // 상태 변수 정의: query는 사용자가 입력한 검색어, movies는 검색 결과
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: '9d2bff12ed955c7f1f74b83187f188ae', // 영화 DB API 키
        query: query // 검색어
      }
    })
    .then(response => setMovies(response.data.results)) // 검색 결과를 상태 변수에 저장
    .catch(error => console.error("Error fetching the movies", error)); // 오류 발생 시 콘솔에 출력
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} // 입력값이 변경될 때 상태 변수 업데이트
          placeholder="Search for movies..." 
        />
        <button type="submit">Search</button> // 검색 버튼
      </form>
      <MovieList movies={movies} /> // 검색 결과를 MovieList 컴포넌트에 전달
    </div>
  );
}

export default MovieSearch;

