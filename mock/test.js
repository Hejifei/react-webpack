import FetchMock from 'fetch-mock'
const Mock = require('mockjs')

const mockList = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'data|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})

FetchMock.mock('/mock/list',
    {...mockList},
)


const Random = Mock.Random

const produceData = function () {
    let articles = []
    for (let i = 0; i < 10; i++) {
        let newArticleObject = {
            title: Random.csentence(5),
            content: Random.cparagraph(5, 7),
            time: Random.date() + ' ' + Random.time(),
            location: Random.city()
        }
        articles.push(newArticleObject)
    }
    return {
        data: articles,
        page: 1,
        perPage: 10,
    }
}
// 第三个参数可以是对象也可以是返回对象的函数
FetchMock.mock('/article', produceData)


