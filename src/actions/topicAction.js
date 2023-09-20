import axios from 'axios'
import {keys} from "../keys"
import {link} from "../base_url"
export const fetchTopics=(dispatcher,slug)=>{
	console.log("link"+link.url)
axios.get('https://api.brainlytic.org/topics/'+slug,{

headers:{
	'authorization':keys.authorization,

}

}).then(res=>{
	dispatcher(topicDispatch(res.data))
	console.log(res.data)
}).catch(e=>console.log(e))
}
 
const topicDispatch=data=>{
return {
	type:'fetchTopics',
	data:data
}

}