import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchTicketArticles, clearTicketArticlesSearch } from '../../actions';
import ArticleSearchResults from './ArticleSearchResults';
import ArticleModal from './ArticleModal';

export const SearchArticlesContainer = ({ clearTicketArticlesSearch,searchTicketArticles, article }) => {
  const handleSearch = (options) => {
    searchTicketArticles(options)
  }
  const handleClearSearch = (e) => {
    clearTicketArticlesSearch()
  }
  let search;
  return (
    <div>
      { article? <div className="ticket-article-modal"><ArticleModal /></div> : null}
      <div
        tabIndex="0"
        className="search-articles"
        onBlur={(e) => {
            search.value = '';
            handleClearSearch(e);
          }}>
        <input
          ref={node => {
            search = node;
          }}
          className='edit-modal-input'
          type="text"
          placeholder="search"
          onChange={e => {
            e.preventDefault();
            if (!search.value.trim()) {
              return handleClearSearch(e);
            }
            var options = {term: search}
            handleSearch({term: search.value, archived:false})
          }} />
          <ArticleSearchResults />
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  searchTicketArticles,
  clearTicketArticlesSearch,
}, dispatch);

const mapStateToProps = state => ({
  article: state.ticketPageArticleModal.article,
});

const SearchTicketArticles = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchArticlesContainer);

export default SearchTicketArticles;
