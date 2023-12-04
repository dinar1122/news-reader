import http from '../api/newsApi';


class NewsService {
  getNewsEnByCategory(categoryName, pageSize) {

    const params = {
      country: 'us',
      pageSize: pageSize ?? 4,
      category: categoryName,
    };
    
    
    return http.get('top-headlines', { params });
  } 
  getNewsBySubsFilter(sources) {
    return http.get('top-headlines', {
      params: {
        language: 'en',
        pageSize: 80,
        sources: sources,
       
      }
    })
  }
  getNewsByReq(req) {
    return http.get('top-headlines', {
      params: {
        language: 'en',
        q: req,
        pageSize: 20,
        
       
      }
    })
  }
}

export default new NewsService();