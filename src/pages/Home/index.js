import React from 'react';
import HeroSlider from '../../components/HeroSlider';
import MovieListSlide from '../../components/MovieListSlide';
import { category, movieType, tvType }  from '../../api/tmdbApi';
import TrailerModal from '../../components/TrailerModal';
const Home = () => {
    return (
        <div>
            <HeroSlider/>
            {/* <MovieListSlide slideTitle='Latest Movie' slideCate={category.movie} slideType={movieType.latest}/> */}
            <MovieListSlide slideTitle='Popular Movie' slideCate={category.movie} slideType={movieType.popular}/>
            <MovieListSlide slideTitle='Top-rated Movie' slideCate={category.movie} slideType={movieType.top_rated}/>
            <MovieListSlide slideTitle='Upcomming Movie' slideCate={category.movie} slideType={movieType.upcoming}/>
            {/* <MovieListSlide slideTitle='Latest TV' slideCate={category.tv} slideType={tvType.latest}/> */}
            <MovieListSlide slideTitle='Popular TV' slideCate={category.tv} slideType={tvType.popular}/>
            <MovieListSlide slideTitle='Top-rated TV' slideCate={category.tv} slideType={tvType.top_rated}/>
            <TrailerModal/>
        </div>
    )
}

export default Home