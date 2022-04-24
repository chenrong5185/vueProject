import request from '@/utils/request'
// 获取列表数据
export const reqTradeMatk =(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})
// 新增和编辑
export const reqAddUpdateTradeMatk =(tradeMatk)=>{
 if(tradeMatk.id) {
     return request({url:`/admin/product/baseTrademark/update`,method:'put',data:tradeMatk})
 }
 else {
    return request({url:`/admin/product/baseTrademark/save`,method:'post',data:tradeMatk}) 
 }
}
// 删除
export const reqDelTradeMark = (id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})