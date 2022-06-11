import React,{useRef} from 'react';

import Modal from '../Modal';
import tmdbApi, {category} from '../../api/tmdbApi';

const showTrailer =async (id, cate) =>{
    const {results} = await tmdbApi.getVideo(id, category[cate]);
    const modal = document.querySelector('.modal__content');
    modal.classList.add('active');
    const trailerFrame = modal.querySelector('.modal__content__item > iframe[title="trailer"]');
    if(results.length > 0 )
        trailerFrame.setAttribute('src',`https://www.youtube.com/embed/${results[0].key}`);
}
const TrailerModal = () => {
    const iframeRef = useRef();
     
    const onClose = () => {
        const modal = document.querySelector('.modal__content.active');
        console.log(modal);
        iframeRef.current.setAttribute('src','');
        modal.classList.remove('active');
    }
    
    return (
        <Modal active={false} onClose={onClose}>
            <iframe ref={iframeRef} width='100%' height='600rem' title='trailer'></iframe>
        </Modal>
    )

}

export default TrailerModal;
export {showTrailer};