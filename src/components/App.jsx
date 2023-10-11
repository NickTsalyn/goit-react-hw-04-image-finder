import {useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'api';
import { Container } from 'react-bootstrap';
import { Loader } from './Loader/Loader';
import { ButtonLoadMore } from './Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getContent() {
      try {
        const { totalHits, hits } = await getImages(query, page);

        if (totalHits === 0) {
          toast.error('Nothing was found for your request');
          setLoading(false);
          return;
        }
        setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
        setTotalHits(prevTotalHits =>
          page === 1 ? totalHits - hits.length : prevTotalHits - hits.length
        );

        // if(totalHits === 0) {
        //   toast.error("No more requests")
        // }
        
        if(page === 1) {
          toast.success(`Success, found ${totalHits} images`);
        }
        setLoading(false);
        
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      }
    }
    getContent();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const handleQuerySubmit = query => {
    setQuery(query);
    setPage(1);
  };

  return (
    <Container className="d-flex justify-content-center flex-column">
      <SearchBar onSubmit={handleQuerySubmit} />

      {loading && <Loader />}
      {images && <ImageGallery images={images} />}
      {!!totalHits && <ButtonLoadMore onLoadMore={handleLoadMore} />}

      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
};
