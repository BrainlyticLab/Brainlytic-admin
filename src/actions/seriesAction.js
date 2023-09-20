import axios from 'axios'
import {keys} from "../keys"
export const fetchSerieses=(dispatcher)=>{
axios.get(`https://api.brainlytic.org/admin/getAllSeries`,{

headers:{
	'authorization':keys.authorization,

}

}).then(res=>{
	dispatcher(seriesDispatch(res.data))
	console.log(res.data)
}).catch(e=>console.log(e))
}
 
const seriesDispatch=data=>{
return {
	type:'fetchSerieses',
	data:data
}

}