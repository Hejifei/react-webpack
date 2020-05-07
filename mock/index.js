import FetchMock from 'fetch-mock';
require('./test')

FetchMock.mock('*', (url, options) => {
    FetchMock.restore();
    return fetch(url, options);
});
